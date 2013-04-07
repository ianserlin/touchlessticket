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
		Session.set('currentTime', new Date().getTime());
	}, 1000);
});
