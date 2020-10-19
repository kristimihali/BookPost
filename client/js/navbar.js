import { Template } from 'meteor/templating';


Template.navbar.rendered = function () {
	// body...
}

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