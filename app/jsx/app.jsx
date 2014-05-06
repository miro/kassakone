/** @jsx React.DOM */
define([
	'backbone',
    'text!dummydata',
    'collections/Events',
    'collections/EventOccurrences',
    'collections/Reservations'
], function(
	Backbone,
	dummydata,
	Events,
	EventOccurrences,
	Reservations
) {

    var application = {}; // Wrapper for ~everything
    application.data = {}; // Holder for all the app's data

    // Mock data 
    var mockDB = JSON.parse(dummydata);

    // Collections
    application.data.events = new Events(mockDB.Events);
    application.data.eventOccurrences = new EventOccurrences(mockDB.EventOccurrences);
    application.data.reservations = new Reservations(mockDB.Reservations);

    return application;
});
