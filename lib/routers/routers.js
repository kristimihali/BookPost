Router.configure({
	layoutTemplate: 'main_layout'
});

Router.map(function(){
	//posts
	this.route('posts',{
		path: '/',
		template: 'posts'
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
    this.route('profile',{
        path: '/profile',
        template: 'profile'
    });
    //Rankings
    this.route('rankings',{
        path: '/rankings',
        template: 'rankings'
    });
    //Search
    this.route('search',{
        path: '/search',
        template: 'search'
    });
});

Router.route('/post/:_id',{
    template: "postOpinion",
	data: function(){
        var id = this.params._id;
        console.log(Posts.findOne({ _id: id}));
        return Posts.findOne({ _id: id});
    }
});