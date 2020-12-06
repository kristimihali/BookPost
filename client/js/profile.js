import Images from '/lib/collections/collections.js';


Template.profile.helpers({
	authorised: function(){
		if (Template.currentData()._id == Meteor.userId()) {
			return true;
		}
		return false;
	},

	issuscribe: function(){
		var subscriptions = Meteor.user().profile.subscriptions;
		var res = false;
		if (subscriptions) {
			subscriptions.forEach(subscription => {
				if (subscription._id == Template.currentData()._id) {
					res = true;
				}
			});
		}
		return res;
	},

	email: function(){
		if(!Meteor.user()){
			Bert.alert("You are not logged in. Permission denied!","danger","growl-top-right");
			return false;
		}else{
			//return Meteor.user().emails[0].address;
			return Template.currentData().emails[0].address;
		}
	},

	username: function(){
		if(!Meteor.user()){
			Bert.alert("You are not logged in. Permission denied!","danger","growl-top-right");
			return false;
		}else{
			//return Meteor.user().username;
			return Template.currentData().username;
		}
	},

	image: function(){
		if(!Meteor.user()){
			Bert.alert("You are not logged in. Permission denied!","danger","growl-top-right");
			return false;
		}else{
			//return Meteor.user().profile.profileImage;
			return Template.currentData().profile.profileImage;
		}
	},

	subscriptions: function(){
		if (!Meteor.user()) {
			Bert.alert("You are not logged in. Permission denied !", "danger", "growl-top-right");
		}else {
			return Template.currentData().profile.subscriptions;
		}
	},

	nbSubscriptions: function(){
		if (!Meteor.user()) {
			Bert.alert("You are not logged in. Permission denied !", "danger", "growl-top-right");
		}else {
			return Template.currentData().profile.nbSubscriptions;
		}
	},

	readers: function(){
		if (!Meteor.user()) {
			Bert.alert("You are not logged in. Permission denied !", "danger", "growl-top-right");
		}else {
			return Template.currentData().profile.readers;
		}
	},

	nbReaders: function(){
		if (!Meteor.user()) {
			Bert.alert("You are not logged in. Permission denied !", "danger", "growl-top-right");
		}else {
			return Template.currentData().profile.nbReaders;
		}
	},

	userPosts: function(){
		return Posts.find({userId: Template.currentData()._id});
	},

	userLoveScore: function(){
		//return Meteor.user().profile.loveScore;
		return Template.currentData().profile.loveScore;
	},

	uploadedFiles: function () {
    return Images.find();
  }
});

Template.profile.events({
	"click #btn_suscribe": function(){
		Meteor.call("suscribe", Template.currentData()._id);
		Bert.alert(Template.currentData().username+" is your friend now !", "success", "growl-top-right");
	},

	"click #btn_unsuscribe": function(){
		console.log(this);
		//Meteor.call("unsuscribe", Template.currentData()._id);
	},

	"click #delete-post": function(){
		Meteor.call("removePost", this._id);
		Bert.alert("Your Post was deleted!", "success", "growl-top-right");
	},

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

			$('#newPostModal').modal('hide')
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
