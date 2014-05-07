define([
    'underscore',
    'backbone',
    'models/Event'
], function (
    _,
    Backbone,
    Event
) {

    return Backbone.Collection.extend({
        url: '/api/mock/events.json',
        model: Event
    });
    
});
