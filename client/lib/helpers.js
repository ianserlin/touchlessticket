Helpers = {};

Helpers.extractData = function(form){
	var data = _.reduce($(form).serializeArray(), function(memo, item){
		memo[item.name] = item.value;
		return memo;
	}, {});
	return data;
}

Handlebars.registerHelper("time", function (d, options) {
	return moment(d).format('h:mm a');
});

Handlebars.registerHelper("timeAgo", function (d, options) {
	return moment(d).fromNow();
});

Handlebars.registerHelper("timeAgoShort", function (d, options) {
	return moment(d).fromNow(true);
});

Handlebars.registerHelper("toDate", function (d, options) {
	return moment(d).format('M/D/YY');
});

Handlebars.registerHelper("ticketClassFor", function (status, options) {
	var cssClass = 'alert-info';
	switch(status){
		case 'NEW':
			cssClass = 'alert-info';
			break;
		case 'FIRED':
		case 'SERVED':
			cssClass = '';
			break;
		case 'COMPLETED':
			cssClass = 'alert-success';
			break;
		case 'VOID':
			cssClass = 'alert-warning';
			break;
	}
	return cssClass;
});

Handlebars.registerHelper("expediteTicketClassFor", function (status, options) {
	var cssClass = 'alert-danger';
	switch(status){
		case 'NEW':
			cssClass = 'alert-danger';
			break;
		case 'FIRED':
		case 'SERVED':
			cssClass = '';
			break;
		case 'COMPLETED':
			cssClass = 'alert-success';
			break;
		case 'VOID':
			cssClass = 'alert-warning';
			break;
	}
	return cssClass;
});