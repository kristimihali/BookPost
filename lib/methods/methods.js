
if(Meteor.isServer){
	Meteor.methods({
		//Methods for adding posts
		addPost(postName, postPost, bookAuthor, bookTitle){
			if(!Meteor.userId()){ //not logged in
				throw new Meteor.Error("Not authorised!");
				return false;
			}else{
				var user = Meteor.user();
				var year = new Date().getFullYear();
				var month = new Date().getMonth() + 1;
				var day = new Date().getDate();
				var date = (  day + "/" + month + "/" + year).toString();

				return Posts.insert({
					postName: postName,
					bookAuthor: bookAuthor,
					bookTitle: bookTitle,
					postContent: postPost,
					img: null,
					author: user,
					date: date,
					createdAt: new Date(),
					loveScore: 0,
					voted: [user.username],
					nbComments: 0,
					userId: Meteor.userId(),
				});
			}
		},

		addImgPost(postId, imgId, imgExtension){
			var nameImg = imgId+imgExtension;
			var newImg = "http://localhost:3000/cdn/storage/Images/"+imgId+"/original/"+nameImg;

			Posts.update(postId, {$set: {img: newImg}});
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

		addPostLove(postId, postAuthor, user){
			if(!Meteor.userId()){
				throw new Meteor.Error("Not authorised!");
				this.stop();
				return false;
			}else{
				Posts.update(postId, { $addToSet: { voted: user }});
				Posts.update(postId, { $inc: { loveScore: +1 }});
				Meteor.users.update(postAuthor, { $inc: { "profile.loveScore": +1 }});
			}
		},

		dislikePost(postId, postAuthor, user){
			if(!Meteor.userId()){
				throw new Meteor.Error("Not authorised!");
				this.stop();
				return false;
			}else{
				Posts.update(postId, { $pull: { voted: user }});
				Posts.update(postId, { $inc: { loveScore: -1 }});
				Meteor.users.update(postAuthor, { $inc: { "profile.loveScore": -1 }});
			}
		},

		addComment(postId, msg){
			Comments.insert({
				postId: postId,
				author: Meteor.user(),
				comment: msg,
				createdAt: new Date(),
				nbLikes: 0,
				nbLaughts: 0,
				nbSads: 0,
				voted: [],
			});

			Posts.update(postId, {$inc: {nbComments: +1}});
		},

		likeComment(commentId){
			Comments.update(commentId, {$addToSet: {voted: Meteor.user().username}});
			Comments.update(commentId, {$inc: {nbLikes: +1}});
		},

		laughtComment(commentId){
			Comments.update(commentId, {$addToSet: {voted: Meteor.user().username}});
			Comments.update(commentId, {$inc: {nbLaughts: +1}});
		},

		cryComment(commentId){
			Comments.update(commentId, {$addToSet: {voted: Meteor.user().username}});
			Comments.update(commentId, {$inc: {nbSads: +1}});
		},

		editComment(commentId, msg){
			Comments.update(commentId, {$set: {comment: msg}});
		},

		removeComment(commentId){
			var postId = Comments.findOne({_id: commentId}).postId;
			Posts.update(postId, {$inc: {nbComments: -1}});

			Comments.remove(commentId);
		},

		addMessage(name, msg){
			if(!Meteor.userId()){ //not logged in
				throw new Meteor.Error("Not authorised!");
				return false;
			}else{
				Messages.insert({
          username: name,
          message: msg,
          date: new Date(),
					userId: Meteor.userId(),
        });
			}

		},

		suscribe(id){
			var user = Meteor.users.findOne({_id: id});
			Meteor.users.update(user._id, {$addToSet: { "profile.readers": Meteor.user() }});
			Meteor.users.update(user._id, {$inc: { "profile.nbReaders": +1 }});

			Meteor.users.update(Meteor.userId(), {$addToSet: { "profile.subscriptions": user }});
			Meteor.users.update(Meteor.userId(), {$inc: { "profile.nbSubscriptions": +1 }});
		},

		unsuscribe(id){
			var user = Meteor.users.findOne({_id: id});
			Meteor.users.update(user._id, {$pull: { "profile.readers": {_id: Meteor.userId()} }});
			Meteor.users.update(user._id, {$inc: { "profile.nbReaders": -1 }});

			Meteor.users.update(Meteor.userId(), {$pull: { "profile.subscriptions": {_id: id} }});
			Meteor.users.update(Meteor.userId(), {$inc: { "profile.nbSubscriptions": -1 }});
		},

		removeReader(id){
			var user = Meteor.users.findOne({_id: id});
			Meteor.users.update(user._id, {$pull: { "profile.subscriptions": {_id: Meteor.userId()} }});
			Meteor.users.update(user._id, {$inc: { "profile.nbSubscriptions": -1 }});

			Meteor.users.update(Meteor.userId(), {$pull: { "profile.readers": {_id: id} }});
			Meteor.users.update(Meteor.userId(), {$inc: { "profile.nbReaders": -1 }});
		},

		changeImgProfile(idImg, extImg){
			console.log(idImg);
			var nameImg = idImg+extImg;
			var newImg = "http://localhost:3000/cdn/storage/Images/"+idImg+"/original/"+nameImg;

			Meteor.users.update(Meteor.userId(), {
				$set: {
					profile: {
						profileImage: newImg,
						friends: Meteor.user().profile.friends,
						nbFriends: Meteor.user().profile.nbFriends,
						followers: Meteor.user().profile.followers,
						nbFollowers: Meteor.user().profile.nbFollowers,
						loveScore: Meteor.user().profile.loveScore,
						voted: Meteor.user().profile.voted
					}
				}
			});
		},

		editProfile(newUsername, newEmail, oldPass, newPassword ){
			var checkPass = Accounts._checkPassword(Meteor.user(), oldPass);
			if (checkPass.error) {
				throw new Meteor.Error("Bad Password");
				//this.stop();
				return false;
			}else{
				Meteor.users.update(Meteor.userId(), {
					$set: {
						username: newUsername,
						emails: [{address: newEmail, verified: false}]
					}
				});

				var posts = Posts.find({userId: Meteor.userId()});
				posts.forEach(post => {
					Posts.update(post._id, {$set: { author: Meteor.user()}});
				});

			}
		}

	});
}
