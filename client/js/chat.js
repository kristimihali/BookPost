Template.msgUser.helpers({
  time: function(){
    var sec = Math.round((new Date() - this.date)/1000);
    if (sec == 0) {
      return "now";
    }
    if (sec >= 60) {
      var min = Math.round(sec/60);
      if (min >= 60) {
        var hour = Math.round(min/60);
        if (hour >= 24) {
          return this.date.getDate()+"/"+this.date.getMonth()+"/"+this.date.getFullYear();
        }
        return hour+" h ago";
      }
      else {
        return min+" min ago";
      }
    }
    else {
      return sec+" s ago";
    }
  },

  profileImg: function(){
    var user = Meteor.users.findOne({_id: this.userId});
    return user.profile.profileImage;
  }
});
Template.msgFriend.helpers({
  time: function(){
    var sec = Math.round((new Date() - this.date)/1000);
    if (sec == 0) {
      return "now";
    }
    if (sec >= 60) {
      var min = Math.round(sec/60);
      if (min >= 60) {
        var hour = Math.round(min/60);
        if (hour >= 24) {
          return this.date.getDate()+"/"+this.date.getMonth()+"/"+this.date.getFullYear();
        }
        return hour+" h ago";
      }
      else {
        return min+" min ago";
      }
    }
    else {
      return sec+" s ago";
    }
  },

  profileImg: function(){
    var user = Meteor.users.findOne({_id: this.userId});
    return user.profile.profileImage;
  }
});

Template.chatWindow.helpers({
    messages: function() {
        return Messages.find({}, { sort: { time: -1}});
    },

    myMessage: function(){
      if (this.userId == Meteor.userId()) {
        return true;
      }
      return false;
    },
})

Template.chatWindow.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event

      var message = document.getElementById('message');

      if (message.value != '') {
        Meteor.call("addMessage", Meteor.user().username, message.value);
        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  },

}
