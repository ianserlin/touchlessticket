Template.serve.tickets = function(){
	return Tickets.find({status: TicketStatus.COMPLETED});
};

Template.serveTicket.events({
	'click .done': function(e, tmpl){
		$(e.currentTarget).parents('.ticket').addClass('animated rollOut');
		var self = this;
		Meteor.setTimeout(function(){
			Tickets.update(self._id, { $set: { status: TicketStatus.SERVED } });
		}, 1200);
		return false;
	}
});