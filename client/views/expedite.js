Template.expedite.tickets = function(){
	return Tickets.find({ 
			status: { $nin: [ TicketStatus.VOID, TicketStatus.SERVED ] }
		}, { 
			sort: [["status", "desc"], ["createdAt", "desc"]]
		});
};

Template.currentTime.currentTime = function(){
	return moment(Session.get('currentTime')).format('dddd h:m:ss a');
};

Template.expediteTicket.events({
	'click .ticket': function(e, tmpl){
		selectTicket(e.currentTarget);
	}
});

Template.expediteTicket.fired = function(){
	return this.firedAt;
};

Template.expediteTicket.completed = function(){
	return this.completedAt;
};

// GESTURE HOOKS

showExpediterOverview = function(){
	$('#expediterOverview').removeClass('hide animated bounceOutUp').addClass('animated bounceInDown');
};

hideExpediterOverview = function(){
	$('#expediterOverview').removeClass('animated bounceInDown').addClass('animated bounceOutUp');
};

selectTicket = function(element){
	var _id = $(element).data('ticket')
		, ticket = Tickets.findOne({_id: _id});
	if(ticket){
		switch(ticket.status){
			case TicketStatus.NEW:
				Tickets.update(ticket._id, {$set: { 
					status: TicketStatus.FIRED
					, firedAt: new Date()
				}}, function(){
					$('[data-ticket="'+_id+'"]').addClass('animated pulse');
				});
				break;
			case TicketStatus.FIRED:
				$(element).removeClass('alert-info animated pulse');
				Tickets.update(ticket._id, {
					$set: { 
						status: TicketStatus.COMPLETED 
						, completedAt: new Date()
					}
				}, function(err){
					$('[data-ticket="'+_id+'"]').addClass('alert-success animated pulse');
				});
				break;
		}
	}
};
