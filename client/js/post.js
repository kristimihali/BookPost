
Template.post.onCreated(function() {
	this.showComments = new ReactiveVar(false);
});

Template.post.helpers({
	selected: function(){
		return Session.equals('selectedPost', this.__originalId) ? "selected" : '';
	},

	myPost: function(){
		if (this.userId == Meteor.userId()) {
			return true;
		}
		return false;
	},

	isLiked: function(){
		var postLovers = null;
		if (this.__originalId) {
			postLovers = Posts.findOne({_id: this.__originalId}, {voted: {$in: Meteor.user().username}}).voted;
		} else {
			postLovers = Posts.findOne({_id: this._id}, {voted: {$in: Meteor.user().username}}).voted;
		}

		if (postLovers.indexOf(Meteor.user().username) > -1) {
			return true;
		}
		return false;
	},

	hasImg: function(){
		if (this.img != null) {
			return true;
		}
		return false;
	},

	showComments: function(){
		return Template.instance().showComments.get();
	},

	comments: function(){
		if (this.__originalId) {
			return Comments.find({postId: this.__originalId});
		} else {
			return Comments.find({postId: this._id});
		}

	}

});

Template.post.events({
	"click #love": function(event){
		var heart = event.target.attributes[4];
		var postLovers = null;
		if (this.__originalId) {
			postLovers = Posts.findOne({_id: this.__originalId}, {voted: {$in: Meteor.user().username}}).voted;
		} else {
			postLovers = Posts.findOne({_id: this._id}, {voted: {$in: Meteor.user().username}}).voted;
		}

		if(Meteor.userId() == this.userId){
			Bert.alert("You cannot vote for your own post.", "danger", "growl-top-right");
		}
		else {
			if(postLovers.indexOf(Meteor.user().username) > -1){
				Bert.alert("You cannot vote twice.", "danger", "growl-top-right");

			}else{
				heart.nodeValue = "fas";
				if (this.__originalId) {
					Meteor.call("addPostLove", this.__originalId, this.userId, Meteor.user().username);
				} else {
					Meteor.call("addPostLove", this._id, this.userId, Meteor.user().username);
				}
				Bert.alert("Your vote was placed !", "success", "growl-top-right");
			}
		}
	},

	"click #comment": function(event, template){
		var txt = event.target;
		if (template.showComments.get() == true) {
			template.showComments.set(false);
			txt.textContent = "Show comments";
		}else {
			template.showComments.set(true);
			txt.textContent = "Hide comments";
		}
	},

	"click #sendComment": function(event){
		var msg = event.currentTarget.parentElement.previousElementSibling;
		if (this.__originalId) {
			Meteor.call("addComment", this.__originalId, msg.value);
		} else {
			Meteor.call("addComment", this._id, msg.value);
		}
		msg.value = "";
		Bert.alert("Comment successfully added !", "success", "growl-top-right");
	},

	"click #delete-post": function(){
		if (this.__originalId) {
			Meteor.call("removePost", this.__originalId);
		} else {
			Meteor.call("removePost", this._id);
		}
		Bert.alert("Your Post was deleted !", "success", "growl-top-right");
	},

	'click': function(){
		if (this.__originalId) {
			Session.set('selectedPost', this.__originalId);
		} else {
			Session.set('selectedPost', this._id);
		}
	}
});
