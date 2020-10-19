if(Meteor.isClient){
	Meteor.subscribe("Posts");
	Meteor.subscribe("Users");
	// Meteor.subscribe('files.images.all');
}