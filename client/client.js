// METEOR

screenWidth = screen.width;
screenHeight = screen.height;

function authorize(){
	if(Meteor.userId() == null){
		this.redirect('/');
	}
}

Meteor.pages({
	'/': { to: 'home' }
	, '/expedite': { to: 'expedite', before: authorize, layout: 'expediteLayout' }
	, '/order': { to: 'order', before: authorize }
	, '/serve': { to: 'serve', before: authorize }
	, '*': { to: 'home' }
}
, {
	defaults: {
		layout: 'layout'
	}
});

Meteor.subscribe('allTickets');

Meteor.startup(function(){
	Meteor.setInterval(function(){
		var currentTime = new Date().getTime();
		Tickets.find({ status: TicketStatus.FIRED }).forEach(function(ticket){
			var danger = ticket.firedAt && (moment(currentTime).diff(ticket.firedAt) > 60000) && !(ticket.completedAt);
			if(danger){
				Tickets.update(ticket._id, {$set: { overdue: true }});
			}
		});
		Session.set('currentTime', currentTime);
	}, 1000);
});
