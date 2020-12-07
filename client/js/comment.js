
Template.comment.onCreated(function(){
  this.liked = new ReactiveVar(false);
  this.laughting = new ReactiveVar(false);
  this.cried = new ReactiveVar(false);
  this.edit = new ReactiveVar(false);
});


Template.comment.helpers({
  isMyComment: function(){
    if (Meteor.userId() == this.author._id) {
      return true;
    }
    return false;
  },

  hasLiked: function(){
    return Template.instance().liked.get();
  },

  hasLaughting: function(){
    return Template.instance().laughting.get();
  },

  hasCried: function(){
    return Template.instance().cried.get();
  },

  isEditing: function(){
    return Template.instance().edit.get();
  },

});

Template.comment.events({
  "click .like-action": function(event, template){
    var commentLikers = Comments.findOne({_id: this._id}, {voted: {$in: Meteor.user().username}}).voted;

    if(Meteor.userId() == this.author._id){
			Bert.alert("You cannot vote for your own comment.", "danger", "growl-top-right");
		}else {
      if(commentLikers.indexOf(Meteor.user().username) > -1){
				Bert.alert("You cannot vote twice.", "danger", "growl-top-right");
      }else {
        Meteor.call("likeComment", this._id);
        Bert.alert("Your vote was placed !", "success", "growl-top-right");
        template.liked.set(true);
      }

    }
  },

  "click .laught-action": function(event, template){
    var commentLaughter = Comments.findOne({_id: this._id}, {voted: {$in: Meteor.user().username}}).voted;

    if(Meteor.userId() == this.author._id){
			Bert.alert("You cannot vote for your own comment.", "danger", "growl-top-right");
		}else {
      if(commentLaughter.indexOf(Meteor.user().username) > -1){
				Bert.alert("You cannot vote twice.", "danger", "growl-top-right");
      }else {
        Meteor.call("laughtComment", this._id);
        Bert.alert("Your vote was placed !", "success", "growl-top-right");
        template.laughting.set(true);
      }

    }
  },

  "click .sad-action": function(event, template){
    var commentSader = Comments.findOne({_id: this._id}, {voted: {$in: Meteor.user().username}}).voted;

    if(Meteor.userId() == this.author._id){
			Bert.alert("You cannot vote for your own comment.", "danger", "growl-top-right");
		}else {
      if(commentSader.indexOf(Meteor.user().username) > -1){
				Bert.alert("You cannot vote twice.", "danger", "growl-top-right");
      }else {
        Meteor.call("cryComment", this._id);
        Bert.alert("Your vote was placed !", "success", "growl-top-right");
        template.cried.set(true);
      }

    }
  },

  "click .edit-action": function(event, template){
    template.edit.set(true);
  },

  "click .save-action": function(event, template){
    var msg = event.currentTarget.parentElement.previousElementSibling;
    Meteor.call("editComment", this._id, msg.value, function(err, res){
      if (err) {
        Bert.alert("Error: "+err+" !", "danger", "growl-top-right");
      }
      else {
        Bert.alert("Comment successfully edit !", "success", "growl-top-right");
        template.edit.set(false);
      }
    });
  },

  "click .remove-action": function(){
    Meteor.call('removeComment', this._id);
    Bert.alert('Comment successfully delete !', "success", "growl-top-right");
  },
});
