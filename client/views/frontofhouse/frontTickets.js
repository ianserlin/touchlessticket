Template.frontTickets.tickets = function(){
	return Tickets.find({ status: { $nin: [ TicketStatus.VOID ] }});
}