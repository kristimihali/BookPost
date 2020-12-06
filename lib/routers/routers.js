Router.configure({
	layoutTemplate: 'main_layout'
});

Router.map(function(){
	//posts
	this.route('posts',{
		path: '/',
		template: 'home'
	});

	//login
	this.route('login',{
		path: '/login',
		template: 'login'
	});

	//signup
	this.route('signup',{
		path: '/signup',
		template: 'signup'
	});

	//Profile
  /*this.route('profile',{
    path: '/profile',
    data: function() {return Meteor.user();}
  });*/

	this.route('profile',{
		path: '/profile/:_id',
    waitOn: function() {
			return Meteor.subscribe('singleUser', this.params._id);
    },
    data: function() {
      return Meteor.users.findOne({_id: this.params._id});
    }
	});

  //Rankings
  this.route('rankings',{
		path: '/rankings',
    template: 'rankings'
  });

	this.route('chat',{
		path: '/chat',
		template: 'chat'
	});
});

Router.route('/post/:_id',{
	template: "post",
	data: function(){
		var id = this.params._id;
    console.log(Posts.findOne({ _id: id}));
    return Posts.findOne({ _id: id});
  }
});
/*Router.route('/profile/:_id',{
	name: "userProfile",
	controller: "ProfileController"
});

ProfileController = RouteController.extend({
    template: "userProfile",
    waitOn: function(){
			console.log(this.params._id);
			return Meteor.subscribe("userProfile", this.params._id);
    },
    data: function(){
			var id = this.params._id;
			console.log(id);
			console.log(Meteor.users.findOne({_id: id}));
      return Meteor.users.findOne({_id: id});
    }
});*/
