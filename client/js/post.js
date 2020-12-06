
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

	showComments: function(){
		return Template.instance().showComments.get();
	},

	comments: function(){
		return Comments.find({postId: this.__originalId});
	}

});

Template.post.events({
	"click #love": function(){
		var thisPost = Posts.findOne({_id: this.__originalId});
		var postLovers = Posts.findOne({_id: this.__originalId}, {voted: {$in: Meteor.user().username}}).voted;

		if(Meteor.userId() == thisPost.userId){
			Bert.alert("You cannot vote for your own post.", "danger", "growl-top-right");
		}
		else {
			if(postLovers.indexOf(Meteor.user().username) > -1){
				Bert.alert("You cannot vote twice.", "danger", "growl-top-right");
			}else{
				Meteor.call("addPostLove", thisPost._id, thisPost.userId, Meteor.user().username);
				Bert.alert("Your vote was placed !", "success", "growl-top-right");
			}
		}
	},

	"click #comment": function(event, template){
		var txt = document.getElementById('comment');
		if (template.showComments.get() == true) {
			template.showComments.set(false);
			txt.innerHTML = `<a href="#">Show comments</a>`;
		}else {
			template.showComments.set(true);
			txt.innerHTML = `<a href="#">Hide comments</a>`;
		}
	},

	"click #sendComment": function(){
		var msg = document.getElementById('msgComment');
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
