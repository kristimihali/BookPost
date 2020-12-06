import { Template } from 'meteor/templating';


Template.navbar.rendered = function () {
	// body...
}
Template.navbar.helpers({
	inputAttributes: function(){
		return { 'class': 'easy-search-input form-control', 'placeholder': 'Start Searching'};
	},

	resultsCount: function() {
		return PostsIndex.getComponentDict().get('count');
	},

	postsIndex: () => PostsIndex,

	myId: function(){
		return Meteor.userId();
	}
});

Template.navbar.events({
	"click .logout": function(event){
		Meteor.logout(function(error){
			if(error){
				Bert.alert(error.reason, "danger", "growl-top-right");
			}else{
				Router.go("/");
				Bert.alert("You are now logged out!", "success", "growl-top-right");
			}
		});
	},

	
});
