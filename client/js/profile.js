import Images from '/lib/collections/collections.js';


Template.profile.helpers({
	authorised: function(){
		if (Router.current().params._id == Meteor.userId()) {
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
			return Template.currentData().emails[0].address;
		}
	},

	username: function(){
		if(!Meteor.user()){
			Bert.alert("You are not logged in. Permission denied!","danger","growl-top-right");
			return false;
		}else{
			return Template.currentData().username;
		}
	},

	image: function(){
		if(!Meteor.user()){
			Bert.alert("You are not logged in. Permission denied!","danger","growl-top-right");
			return false;
		}else{
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
		return Template.currentData().profile.loveScore;
	},

	uploadedFiles: function () {
    return Images.find();
  }
});

Template.profile.events({
	"click #btn_suscribe": function(){
		Meteor.call("suscribe", Template.currentData()._id);
		Bert.alert("You are now subscribe to "+Template.currentData().username, "success", "growl-top-right");
	},

	"click #btn_unsuscribe": function(){
		Meteor.call("unsuscribe", Template.currentData()._id);
		Bert.alert("Your are no longer subscribe to "+Template.currentData().username, "success", "growl-top-right");
	},

	"click #btn_rmSubscription": function(){
		Meteor.call("unsuscribe", this._id);
		Bert.alert("Your are no longer subscribe to "+this.username, "success", "growl-top-right");
	},

	"click #btn_rmReader": function(){
		Meteor.call("removeReader", this._id);
		Bert.alert("Your have remove "+this.username+" to your readers", "success", "growl-top-right");
	},

	"click #delete-post": function(){
		Meteor.call("removePost", this._id);
		Bert.alert("Your Post was deleted!", "success", "growl-top-right");
	},

});
