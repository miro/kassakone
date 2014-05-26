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

    return application;
});
