
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
		var postLovers = Posts.findOne({_id: this.__originalId}, {voted: {$in: Meteor.user().username}}).voted;

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
		return Comments.find({postId: this.__originalId});
	}

});

Template.post.events({
	"click #love": function(event){
		var heart = event.target.attributes[4];
		var postLovers = Posts.findOne({_id: this.__originalId}, {voted: {$in: Meteor.user().username}}).voted;

		if(Meteor.userId() == this.userId){
			Bert.alert("You cannot vote for your own post.", "danger", "growl-top-right");
		}
		else {
			if(postLovers.indexOf(Meteor.user().username) > -1){
				Bert.alert("You cannot vote twice.", "danger", "growl-top-right");

			}else{
				heart.nodeValue = "fas";
				Meteor.call("addPostLove", this.__originalId, this.userId, Meteor.user().username);
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
		Meteor.call("addComment", this.__originalId, msg.value);
		msg.value = "";
		Bert.alert("Comment successfully added !", "success", "growl-top-right");
	},

	"click #delete-post": function(){
		Meteor.call("removePost", this.__originalId);
		Bert.alert("Your Post was deleted !", "success", "growl-top-right");
	},

	'click': function(){
		Session.set('selectedPost', this.__originalId);
	}
});
