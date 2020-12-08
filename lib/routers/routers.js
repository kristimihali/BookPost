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

	//profile
	this.route('profile',{
		path: '/profile/:_id',
    waitOn: function() {
			return Meteor.subscribe('singleUser', this.params._id);
    },
    data: function() {
      return Meteor.users.findOne({_id: this.params._id});
    }
	});

});

// Router.route('/post/:_id',{
//     template: "postOpinion",
// 	data: function(){
//         var id = this.params._id;
//         //console.log(Posts.findOne({ _id: id}));
//         return Posts.findOne({ _id: id});
//     }
// });
