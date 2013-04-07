// METEOR

ScreenWidth = screen.width;
ScreenHeight = screen.height;

function authorize(){
	if(Meteor.userId() == null){
		this.redirect('/');
	}
}

Meteor.pages({
	'/': { to: 'home' }
	, '/dashboard': { to: 'dashboard', before: authorize }
	, '/front': { to: 'frontOfHouse', before: authorize }
	, '*': { to: 'home' }
}
, {
	defaults: {
		layout: 'layout'
	}
});

Meteor.subscribe('allTickets');

Meteor.startup(function(){

});