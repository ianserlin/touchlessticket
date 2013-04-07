Template.expedite.tickets = function(){
	return Tickets.find({ 
			status: { $nin: [ TicketStatus.VOID, TicketStatus.SERVED, TicketStatus.COMPLETED ] }
		}, { 
			sort: [["status", "desc"], ["createdAt", "desc"]]
		});
};

selectTicket = function(element){
	var _id = $(element).data('ticket')
		, ticket = Tickets.findOne({_id: _id});
	if(ticket){
		switch(ticket.status){
			case TicketStatus.NEW:
				Tickets.update(ticket._id, {$set: { status: TicketStatus.FIRED }}, function(){
					$('[data-ticket="'+_id+'"]').addClass('animated pulse');
				});
				break;
			case TicketStatus.FIRED:
				$(element).removeClass('alert-info').addClass('animated fadeOut alert-success');
				Meteor.setTimeout(function(){
					Tickets.update(ticket._id, {$set: { status: TicketStatus.COMPLETED }});
				}, 1500);
				break;
		}
	}
};
