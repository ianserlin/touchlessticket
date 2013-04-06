Tickets = new Meteor.Collection('tickets');

TicketStatus = {
	NEW: 'NEW'
	, IN_PROGRESS: 'IN_PROGRESS'
	, COMPLETED: 'COMPLETED'
	, VOID: 'VOID'
};