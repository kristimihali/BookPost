if(Meteor.isClient){
	Meteor.subscribe("Posts");
	Meteor.subscribe("Users");
	Meteor.subscribe("Comments");
	Meteor.subscribe("Messages");

}
