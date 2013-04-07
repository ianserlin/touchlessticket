Template.done.tickets = function(){
	return Tickets.find({status: TicketStatus.COMPLETED});
};

Template.doneTicket.events({
	'click .done': function(e, tmpl){
		Tickets.update(this._id, { $set: { status: TicketStatus.SERVED } });
		return false;
	}
});