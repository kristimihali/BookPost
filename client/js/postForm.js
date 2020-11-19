Template.postForm.rendered = function(){

}

Template.postForm.events({
	"submit .post-post": function(events){
		var postName = event.target.postName.value;
		var postPost = event.target.postPost.value;
		var bookAuthor = event.target.bookAuthor.value;
		var bookTitle = event.target.bookTitle.value;


		if(isNotEmpty(postName) && isNotEmpty(postPost) && (isNotEmpty(bookAuthor) || isNotEmpty(bookTitle))){

			Meteor.call("addPost", postName, postPost, bookAuthor, bookTitle);
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
