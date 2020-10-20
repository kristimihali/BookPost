Template.profile.rendered = function(){
	$("#profile-link").addClass("selected");
	
	$("#posts-link").removeClass("selected");
	$("#search-link").removeClass("selected");
	$("#rankings-link").removeClass("selected");
	$("#login-link").removeClass("selected");
}

Template.profile.helpers({
	email: function(){
		if(!Meteor.user()){
			Bert.alert("You are not logged in. Permission denied!","danger","growl-top-right");
			return false;
		}else{
			return Meteor.user().emails[0].address;
		}
	},

	username: function(){
		if(!Meteor.user()){
			Bert.alert("You are not logged in. Permission denied!","danger","growl-top-right");
			return false;
		}else{
			return Meteor.user().username;
		}
	},

	profileImage: function(){
		if(!Meteor.user()){
			Bert.alert("You are not logged in. Permission denied!","danger","growl-top-right");
			return false;
		}else{
			return Meteor.user().profile.profileImage;
		}
	},

	userPosts: function(){
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var userPosts = Posts.find({userId: userId});

		return userPosts;
	},

	userLoveScore: function(){
		return Meteor.user().profile.loveScore;
	},

	userNeutralScore: function(){
		return Meteor.user().profile.neutralScore;

	},

	userSadScore: function(){
		return Meteor.user().profile.sadScore;

	},
});

Template.profile.events({
	"click #delete-post": function(){
		Meteor.call("removePost", this._id);
		Bert.alert("Your Post was deleted!", "success", "growl-top-right");
	},
});

