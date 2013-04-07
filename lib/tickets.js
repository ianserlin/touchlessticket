Tickets = new Meteor.Collection('tickets');

TicketStatus = {
	NEW: 'NEW'
	, FIRED: 'FIRED'
	, COMPLETED: 'COMPLETED'
	, VOID: 'VOID'
};