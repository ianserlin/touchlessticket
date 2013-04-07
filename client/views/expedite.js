Template.expedite.tickets = function(){
	return Tickets.find({ 
			status: { $nin: [ TicketStatus.VOID, TicketStatus.SERVED ] }
		}, { 
			sort: ["status", ["createdAt", "desc"]]
		});
};