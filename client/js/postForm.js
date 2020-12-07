import Images from '/lib/collections/collections.js';

Template.postForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.postForm.helpers({
	currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
});

Template.postForm.events({
	"submit .post-post": function(events, template){
		var postName = event.target.postName.value;
		var postPost = event.target.postPost.value;
		var bookAuthor = event.target.bookAuthor.value;
		var bookTitle = event.target.bookTitle.value;
		var postImg = event.target.imgPost.files;

    console.log(event.target.postPost);
		if(isNotEmpty(postName) && isNotEmpty(postPost) && (isNotEmpty(bookAuthor) || isNotEmpty(bookTitle))){

			Meteor.call("addPost", postName, postPost, bookAuthor, bookTitle, function(err, res){
				if (err) {
					console.log(err);
				}else {
					var newPostId = res;

					if (postImg && postImg[0]) {
						const upload = Images.insert({
			        file: postImg[0],
			        streams: 'dynamic',
			        chunkSize: 'dynamic'
			      }, false);

			      upload.on('start', function () {
			        template.currentUpload.set(this);
			      });

			      upload.on('end', function (error, fileObj) {
			        if (error) {
			          Bert.alert("Error during upload: " + error, "danger", "growl-top-right");
			        } else {
		            Meteor.call("addImgPost", newPostId, fileObj._id, fileObj.extensionWithDot);
			        }
		          template.currentUpload.set(false);
			      });
			      upload.start();
					}
				}
			});

			event.target.postName.value = "";
			event.target.postPost.value = "";
			event.target.bookAuthor.value = "";
			event.target.bookTitle.value = "";

			$('#exampleModal').modal('hide')
			Bert.alert("Your opinion was posted!", "success", "growl-top-right");
		}else{
			Bert.alert("Type something on each field!", "danger", "growl-top-right");
		}
		return false; //prevent submit
	}
});

//Validation Rules

var isNotEmpty = function(value){
	if (value && value != ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
};
