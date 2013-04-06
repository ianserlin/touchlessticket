Template.newTickets.tickets = function(){
	return Tickets.find({ status: TicketStatus.NEW });
};