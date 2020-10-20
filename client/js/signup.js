import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.signup.rendered = function(){
	// alert("rendered");
}

Template.signup.events({
	"submit .form-signup": function(events){
		var username = trimInput(event.target.username.value);
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);
		var password2 = trimInput(event.target.password2.value);
		var profileImage = trimInput("neutral.png");

		if(isNotEmpty(email) && isNotEmpty(username) && isEmail(email) && areValidPasswords(password, password2)){
			//do stuff
			Accounts.createUser({
				username: username,
				email: email,
				password: password,
				profile: {
					profileImage: profileImage,
					loveScore: 0,
					voted:[],
				}
			}, function(error){
				if(error){
					Bert.alert(error.reason, "danger", "growl-top-right");
				}else{
					Bert.alert("Account created. You are now logged in.", "success", "growl-top-right");
					Router.go("/");
				}
			});
		}

		return false; //prevent submit

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


//Validate Email
isEmail = function(value){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if(filter.test(value)){
		return true;
	}
	Bert.alert("Please use a valid email address!", "danger", "growl-top-right");
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


