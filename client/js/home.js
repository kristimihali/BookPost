import 'bootstrap';


Template.home.onCreated(function() {

		this.openChat = new ReactiveVar(false);
});

Template.home.helpers({
	openChat: function(){
		return Template.instance().openChat.get();
	},

	inputAttributes: function() {
		return { 'class': 'easy-search-input', 'placeholder': 'Start Searching'};
	},

	selectedName: function() {
		var post = PostsIndex.config.MongoCollection.findOne({ __originalId: Session.get("selectedPost") });
		return post && post.postName;
	},

	index: function() {
		return PostsIndex;
	},

	showMore: function() {
		return false;
	},

	subscriptions: function(){
		return Meteor.user().profile.subscriptions;
	},

	renderTmpl: () => Template.renderTemplate,
	postsIndex: () => PostsIndex,
});

Template.home.events({
	"click #btn_chat": function(event, template){
		var btn_text = event.currentTarget;

		if (template.openChat.get() == true) {
			template.openChat.set(false);
			btn_text.innerHTML = `<i class="far fa-comments" style="font-size: 20px"></i> OPEN CHAT`;
		}
		else {
			template.openChat.set(true);
			btn_text.innerHTML = `<i class="far fa-comments" style="font-size: 20px"></i> CLOSE CHAT`;
		}

	},
});
