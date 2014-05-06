/** @jsx React.DOM */
define([
	'backbone',
    'router',
    'text!dummydata',
    'collections/Events',
    'collections/EventOccurrences',
    'collections/Reservations'
], function(
	Backbone,
	Router,
	dummydata,
	Events,
	EventOccurrences,
	Reservations
) {
    var router = new Router(); 

    // Mock data 
    var mockDB = JSON.parse(dummydata);

    // Collections
    this.eventsCollection = new Events(mockDB.Events);
    this.eventOccurrences = new EventOccurrences(mockDB.EventOccurrences);
    this.reservations = new Reservations(mockDB.Reservations);


});
