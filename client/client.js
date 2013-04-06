// METEOR

ScreenWidth = screen.width;
ScreenHeight = screen.height;


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