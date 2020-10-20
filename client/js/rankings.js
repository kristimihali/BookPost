Template.rankings.rendered = function(){
	$("#rankings-link").addClass("selected");

	$("#posts-link").removeClass("selected");
	$("#search-link").removeClass("selected");
	$("#profile-link").removeClass("selected");
	$("#login-link").removeClass("selected");

}

Template.rankings.helpers({
	posts: function(){
		var posts = Posts.find({}, {sort: {loveScore: -1}});
		return posts;
	}
});

Template.rankings.events({
	"click #love": function(){
		var thisUser = Meteor.userId();
		var thisPost = Posts.findOne({_id: this._id})._id;
		var postAuthor = Posts.findOne({_id: this._id}).userId;
		var name = Meteor.user().username;
		var thisPostsVotes = Posts.findOne({_id: this._id}, {voted: {$in: name}}).voted;

		if(thisPostsVotes.indexOf(name) > -1){
			Bert.alert("You cannot vote twice.", "danger", "growl-top-right");
		}else{
			Meteor.call("countVote", thisPost, name);
			Meteor.call("userPointLove", postAuthor);
			Meteor.call("loveVote", thisUser, thisPost);

			Bert.alert("Your vote was placed!", "success", "growl-top-right");
		}

		if(name == thisPostsVotes){
			Bert.alert("You cannot vote for your own post.", "danger", "growl-top-right");
		}	
	},
});