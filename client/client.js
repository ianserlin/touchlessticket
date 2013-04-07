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
	, '/expedite': { to: 'expedite', before: authorize }
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

});