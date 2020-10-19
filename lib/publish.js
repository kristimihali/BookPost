if(Meteor.isServer){
	Meteor.publish('Posts', function(){
		if(!this.userId){
			return false;
			throw new Meteor.Error("not authorised.");
		}else{
			return Posts.find();
		}
	});

	Meteor.publish('Users', function(){
		if(!this.userId){
			return false;
			throw new Meteor.Error("not authorised.");
		}else{
			return Meteor.users.find();
		}
	});


}