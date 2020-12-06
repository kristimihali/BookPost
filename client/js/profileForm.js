import { Template } from 'meteor/templating';
import Images from '/lib/collections/collections.js';


Template.profileForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.profileForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },

  username: function() {
    return Meteor.user().username;
  },

  email: function() {
    return Meteor.user().emails[0].address;
  },
});

Template.profileForm.events({
  "submit .edit-profile": function(events, template){
		var username = trimInput(event.target.username.value);
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);

		if(isNotEmpty(email) && isNotEmpty(username) && isEmail(email)){

      var idImg = Meteor.user().profile.profileImage;

			if (event.target.imgProfile.files && event.target.imgProfile.files[0]) {
				const upload = Images.insert({
	        file: event.target.imgProfile.files[0],
	        streams: 'dynamic',
	        chunkSize: 'dynamic'
	      }, false);

	      upload.on('start', function () {
	        template.currentUpload.set(this);
	      });

	      upload.on('end', function (error, fileObj) {
	        if (error) {
	          Bert.alert("Error during upload: " + error, "danger", "growl-top-right");
	        } else {
            Meteor.call("changeImgProfile", fileObj._id, fileObj.extensionWithDot);
	        }
          template.currentUpload.set(false);
	      });
	      upload.start();
			}

      Meteor.call("editProfile", username, email, password, (err, result) => {
        if (err && err.error == "Bad Password") {
          Bert.alert("Bad Password : password is incorrect !", "danger", "growl-top-right");
        }
        else {
          $('#editProfileModal').modal('hide');
          Bert.alert("Your profile was edited!", "success", "growl-top-right");
        }
      });

      event.target.password.value = "";
		} else {
			Bert.alert("Type something on each field!", "danger", "growl-top-right");
		}

		return false; //prevent submit
	}
});

//Trim Helper
var trimInput = function(val){
	return val.replace(/^\s|\s*$/g, "");
};

//Validation Rules
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
