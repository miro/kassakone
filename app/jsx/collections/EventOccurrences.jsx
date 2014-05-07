define([
    'underscore',
    'backbone',
    'models/EventOccurrence'
], function (
    _,
    Backbone,
    EventOccurrence
) {

    return Backbone.Collection.extend({
        url: '/api/mock/eventOccurrences.json',
        model: EventOccurrence
    });
});
