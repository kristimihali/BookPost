import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';


Posts = new Mongo.Collection('Posts');

/////// For Easy Search
PostsIndex = new EasySearch.Index({
	engine: new EasySearch.MongoDB(),

	engine: new EasySearch.MongoDB({
		sort: function(){
			return { createdAt: -1 };
		},

		selector: function(searchObject, options, aggregation){
			let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
			categoryFilter = options.search.props.categoryFilter;

			if(_.isString(categoryFilter) && !_.isEmpty(categoryFilter)){
				selector.category = categoryFilter;
			}
			console.log(selector);
			return selector;
		}
	}),

	collection: Posts,
	fields: ['postName', 'author.username', 'bookAuthor', 'bookTitle', 'postContent', 'date'],
	defaultSearchOptions: {
		limit: 50,
	},
	permissions: () => {
		return true;
	}
});

Comments = new Mongo.Collection('Comments');
Messages = new Mongo.Collection('Messages');

const Images = new FilesCollection({
  debug: true,
  collectionName: 'Images',
  storagePath: '../../../uploads',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  },
});

if (Meteor.isServer) {
  Images.denyClient();
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
} else {
  Meteor.subscribe('files.images.all');
}

export default Images;
