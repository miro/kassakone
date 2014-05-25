define([
    'underscore',
    'backbone'
], function (
    _,
    Backbone
) {

    var EventOccurrence = Backbone.Model.extend({
        defaults: {
            'id': null,
            'eventId': null,
            'date': null,
            'startTime': null,
            'endTime': null,
            'totalPlaces': null,
            'reservedPlaces': null,
            'soldPlaces': null
        }
    });

    return EventOccurrence;

});
