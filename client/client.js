// METEOR

Meteor.pages({
	'/': { to: 'dashboard', as: 'root', nav: 'dashboard' }
}
, {
	defaults: {
		layout: 'layout'
	}
});

Meteor.subscribe('allTickets');
