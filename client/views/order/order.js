function getUserEmail(){
	var email;
	try{
		email = Meteor.user() && Meteor.user().emails && Meteor.user().emails[0].address;
	}catch(e){}
	return email;
}

Template.order.tickets = function(){
	return Tickets.find({ status: { $nin: [ TicketStatus.VOID, TicketStatus.SERVED, TicketStatus.COMPLETED ] }}, { sort: { createdAt: -1}});
}

Template.newTicketForm.server = function(){
	return getUserEmail();
};

Template.newTicketForm.resetKey = function(){
	return Session.get('resetKey');
};

Template.newTicketForm.events({
	'submit': function(e, tmpl){
		var ticket = Helpers.extractData(e.currentTarget)
			, items = [];
		$('[class="item"]').each(function(index, element){
			var val = $(element).val();
			if(val != ''){
				items.push(val);
			}
		});
		ticket.items = items;
		ticket.orderNumber = Tickets.find({}).count() + 1;
		ticket.server = getUserEmail();

		Tickets.insert(ticket, function(err, _id){
			Session.set('resetKey', Random.id());
		});
		return false;
	}
	, 'click .cancel': function(){
		Session.set('resetKey', Random.id());
	}
	, 'change [class="item"]': function(e, tmpl){
		var emptySelects = 0;
		$('[class="item"]').each(function(index, element){
			if($(element).val() == ''){
				emptySelects++;
			}
		});
		if(emptySelects == 0){
			$('.orderItems').append(Template.orderItem());
		}
	}
});