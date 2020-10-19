
if(Meteor.isServer){
	Meteor.methods({
		//Methods for adding posts 
		addPost(postName, postPost, bookAuthor, bookTitle){
			if(!Meteor.userId()){ //not logged in
				throw new Meteor.Error("Not authorised!");
				return false;
			}else{	
				var username = Meteor.user().username;
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (  day + "/" + month + "/" + year).toString();

				Posts.insert({
					postName: postName,
					bookAuthor: bookAuthor,
					bookTitle: bookTitle,
					postPost: postPost,
					author: username,
					date: date,
					createdAt: new Date(),
					loveScore: 0,
					neutralScore: 0,
					sadScore: 0,
					voted: [username],
					userId: Meteor.userId(),
				});
			}
		},

		removePost(postId){
			if(!Meteor.userId()){
				throw new Meteor.Error("Not authorised!");
				this.stop(); //return false; e njejta gje
				return false;
			}else{
				Posts.remove(postId);
			}
		},

		countVote(thisPost, name){
			if(!Meteor.userId()){
				throw new Meteor.Error("Not authorised!");
				this.stop(); //return false; e njejta gje
				return false;
			}else{
				Posts.update(thisPost, { $addToSet: { voted: name }});
			}
		},

		userPointLove(postAuthor){
			if(!Meteor.userId()){
				throw new Meteor.Error("Not authorised!");
				this.stop(); //return false;
				return false;
			}else{
				Meteor.users.update(postAuthor, { $inc: { "profile.loveScore": +1 }});

			}
		},

		loveVote(thisUser, thisPost){
			if(!thisUser){
				throw new Meteor.Error("Not authorised!");
				return false;
			}else{
				Posts.update(thisPost, { $inc: { loveScore: +1 }})
			}
		},

		userPointNeutral(postAuthor){
			if(!Meteor.userId()){
				throw new Meteor.Error("Not authorised!");
				this.stop(); //return false; e njejta gje
				return false;
			}else{
				Meteor.users.update(postAuthor, { $inc: { "profile.neutralScore": +1 }});

			}
		},

		neutralVote(thisUser, thisPost){
			if(!thisUser){
				throw new Meteor.Error("Not authorised!");
				return false;
			}else{
				Posts.update(thisPost, { $inc: { neutralScore: +1 }})
			}
		},

		userPointSad(postAuthor){
			if(!Meteor.userId()){
				throw new Meteor.Error("Not authorised!");
				this.stop(); //return false; e njejta gje
				return false;
			}else{
				Meteor.users.update(postAuthor, { $inc: { "profile.sadScore": +1 }});

			}
		},

		sadVote(thisUser, thisPost){
			if(!thisUser){
				throw new Meteor.Error("Not authorised!");
				return false;
			}else{
				Posts.update(thisPost, { $inc: { sadScore: +1 }})
			}
		},

	});
}