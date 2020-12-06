
Template.comment.events({
  "click #commentLike": function(){
    Meteor.call("likeComment", this._id);
    Bert.alert("You liked this comment successfully !", "success", "growl-top-right");
  },
});
