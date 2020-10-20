Template.User.helpers({
	selected: function(){
		return Session.equals('selectedPost', this.__originalId) ? "selected" : '';
	},

});
 
Template.User.events({
	'click': function(){
		Session.set('selectedPost', this.__originalId);
	}
})