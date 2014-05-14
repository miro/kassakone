/** @jsx React.DOM */
define([
	'backbone',
    'collections/Events',
    'collections/EventOccurrences',
    'collections/Reservations'
], function(
	Backbone,
	Events,
	EventOccurrences,
	Reservations
) {

    var application = {}; // Wrapper for ~everything
    application.data = {}; // Holder for all the app's data

    // Collections
    application.data.events = new Events();
    application.data.eventOccurrences = new EventOccurrences();
    application.data.reservations = new Reservations();

    application.refreshData = function refreshData() {
        _.values(application.data).forEach(function fetch(collection) {
            collection.fetch().then(function(collection, status) {
                console.log("Fetched data", "Status: " + status, collection);
            });
        });
    };

    return application;
});
