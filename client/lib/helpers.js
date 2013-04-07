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

Handlebars.registerHelper("toDate", function (d, options) {
	return moment(d).format('M/D/YY');
});