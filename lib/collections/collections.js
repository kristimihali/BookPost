Posts = new Mongo.Collection('Posts');

/////// For Easy Search

PostsIndex = new EasySearch.Index({
	engine: new EasySearch.MongoDB(),

	// engine: new EasySearch.MongoDB({
	// 	sort: function(){
	// 		return { createdAt: -1 };
	// 	},

	// 	selector: function(searchObject, options, aggregation){
	// 		let selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
	// 		categoryFilter = options.search.props.categoryFilter;

	// 		if(_.isString(categoryFilter) && !_.isEmpty(categoryFilter)){
	// 			selector.category = categoryFilter;
	// 		}
	// 		console.log(selector);
	// 		return selector;
	// 	}
	// }),

	collection: Posts,
	fields: ['postName', 'author', 'bookAuthor', 'bookTitle'],
	defaultSearchOptions: {
		limit: 10,
	},
	permissions: () => {
		return true;
	}
});
