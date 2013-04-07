Template.serve.tickets = function(){
	return Tickets.find({status: TicketStatus.COMPLETED});
};

Template.serveTicket.events({
	'click .done': function(e, tmpl){
		Tickets.update(this._id, { $set: { status: TicketStatus.SERVED } });
		return false;
	}
});