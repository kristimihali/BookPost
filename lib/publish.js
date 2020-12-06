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

	Meteor.publish("singleUser", function(id){
    var user = Meteor.users.findOne({_id: id});

    if(!user) {
			this.ready();
      return;
    }

    if (this.userId == user._id) {
        return Meteor.users.find(this.userId);
    }
    else {
			return Meteor.users.find(user._id,{
				fields:{
					"username": 1,
					"emails": 1,
					"profile": 1,
        }
    	});
    }
	});

	Meteor.publish('Comments', function(){
		if(!this.userId){
			return false;
			throw new Meteor.Error("not authorised.");
		}else{
			return Comments.find();
		}
	});

	Meteor.publish('Messages', function(){
		if(!this.userId){
			return false;
			throw new Meteor.Error("not authorised.");
		}else{
			return Messages.find();
		}
	});

}
