define([
    'underscore',
    'backbone',
    'models/EventOccurrence',
    'config'
], function (
    _,
    Backbone,
    EventOccurrence,
    config
) {

    return Backbone.Collection.extend({

        model: EventOccurrence,

        initialize: function() {
            this._meta = {};
        },

        // Our own metadata library
        meta: function(prop, value) {
            if (value === undefined) {
                return this._meta[prop];
            } else {
                this._meta[prop] = value;
            }
        },

        url: function() {
            return config.baseUrl + 'Event/' + this.meta('eventId') + '/Occurrence';
        }
        
    });
});
