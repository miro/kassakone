define([
    'underscore',
    'backbone',
    'models/Event',
    'config'
], function (
    _,
    Backbone,
    Event,
    config
) {

    return Backbone.Collection.extend({
        url: config.baseUrl + 'Event',
        model: Event
    });
    
});
