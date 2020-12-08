import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

//automatically route to router
Tracker.autorun(function(){
	if(Meteor.userID){
		Router.go("/posts");
	}
});

Template.login.events({
	"submit .form-signin": function(event){
		var username = trimInput(event.target.username.value);
		var password = trimInput(event.target.password.value);

		if(isNotEmpty(username) && isNotEmpty(password) && isValidPassword(password)){
			Meteor.loginWithPassword(username, password, function(error){
				if(error){
					Bert.alert(error.reason, "danger", "growl-top-right");
					return false;
				}else{
					Router.go("/");
					Bert.alert("You are now logged in!", "success", "growl-top-right");
				}
			});
		}
		return false; //prevent the submit
	}
});

//Validation Rules

//Trim Helper
var trimInput = function(val){
	return val.replace(/^\s|\s*$/g, "");
};

var isNotEmpty = function(value){
	if (value && value != ''){
		return true;
	}
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
	return false;
};

//Check Password Field

isValidPassword = function(password){
	if(password.length < 6){
		Bert.alert("Password must be at least 6 characters!", "danger", "growl-top-right");
		return false;
	}
	return true;
};


areValidPasswords = function(password, confirm){
	if(!isValidPassword(password)){
		return false;
	}
	if(password !== confirm){
		Bert.alert("Passwrds do not match!", "danger", "growl-top-right");
		return false;
	}
	return true;
}
