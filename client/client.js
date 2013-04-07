// METEOR

ScreenWidth = screen.width;
ScreenHeight = screen.height;

function authorize(){
	if(!!Meteor.userId){
		this.redirect('/login');
	}
}

Meteor.pages({
	'/': { to: 'dashboard', as: 'root', nav: 'dashboard', before: authorize }
	, '/front': { to: 'frontOfHouse', before: authorize }
	, '/login': { to: 'login' }
}
, {
	defaults: {
		layout: 'layout'
	}
});

Meteor.subscribe('allTickets');

Meteor.startup(function(){

});