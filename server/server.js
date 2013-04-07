Meteor.publish('allTickets', function () {
    return Tickets.find({});
});

Meteor.startup(function () {
    // if (Tickets.find({}).count() == 0) {
    //     seed();
    // }
})

function seed() {
    for (var i = 0; i < 15; i++) {
        Tickets.insert({
            index: (i + 1), status: TicketStatus.NEW
        });
    }
}
