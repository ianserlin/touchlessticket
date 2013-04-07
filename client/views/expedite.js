var dangerThreshold = 60 * 1000;

Template.expedite.tickets = function(){
	return Tickets.find({ 
			status: { $nin: [ TicketStatus.VOID, TicketStatus.SERVED ] }
		}, { 
			sort: { "createdAt": -1 }
		});
};

Template.currentTime.currentTime = function(){
	return moment(Session.get('currentTime')).format('dddd h:mm:ss a');
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

// Template.expediteTicket.dangerous = function(){
// 	var currentTime = Session.get('currentTime')
// 		danger = moment(currentTime).diff(this.firedAt) > dangerThreshold;
// 	return danger ? 'wobble' : '';
// };

Template.expediteTicket.firedAtAgo = function(){
	var duration = moment(Session.get('currentTime')).diff(this.firedAt) / 1000
		, minutes = duration / 60 | 0
		, seconds = (duration % 60 | 0)+"";
	if(seconds.length == 1){
		seconds = "0" + seconds;
	}

	return minutes + " min " + seconds + " secs";
};

Template.expediteTicket.completedAtAgo = function(){
	var duration = moment(Session.get('currentTime')).diff(this.completedAt) / 1000
		, minutes = duration / 60 | 0
		, seconds = (duration % 60 | 0)+"";
	if(seconds.length == 1){
		seconds = "0" + seconds;
	}
	return minutes + " min " + seconds + " secs";
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
