Template.search.rendered = function(){
	$("#search-link").addClass("selected");

	$("#posts-link").removeClass("selected");
	$("#rankings-link").removeClass("selected");
	$("#profile-link").removeClass("selected");
	$("#login-link").removeClass("selected");
}

Template.search.helpers({
	inputAttributes: function(){
		return { 'class': 'easy-search-input', 'placeholder': 'Start Searching'};
	},

	players: function () {
		return Posts.find({}, { sort: { createdAt: -1 }});
	},

	selectedName: function(){
		var post = PostsIndex.config.MongoCollection.findOne({ __originalId: Session.get("selectedPost") });
		return post && post.postName;
	},

	index: function(){
		return PostsIndex;
	},

	resultsCount: function() {
		// body...
		return PostsIndex.getComponentDict().get('count');
	},

	showMore: function(){
		return false;
	},

	renderTmpl: () => Template.renderTemplate,
	postsIndex: () => PostsIndex,

});

