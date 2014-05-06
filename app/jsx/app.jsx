/** @jsx React.DOM */
define([
	'backbone',
    'router',
    'text!dummydata',
    'collections/Events'
], function(
	Backbone,
	Router,
	dummydata,
	Events
) {
    var router = new Router();

    var mockDB = JSON.parse(dummydata);

    this.eventsCollection = new Events();
    debugger;

});
