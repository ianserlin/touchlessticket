// METEOR

screenWidth = screen.width;
screenHeight = screen.height;


Meteor.pages({
	'/': { to: 'dashboard', as: 'root', nav: 'dashboard' }
}
, {
	defaults: {
		layout: 'layout'
	}
});

Meteor.subscribe('allTickets');

Meteor.startup(function(){

});
