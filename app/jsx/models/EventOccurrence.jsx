define([
    'underscore',
    'backbone',
    'config'
], function (
    _,
    Backbone,
    config
) {

    return Backbone.Model.extend({
    	defaults: {
    		'reservedPlaces': '?',
    		'totalPlaces': '?',
    		'soldPlaces': '?'
    	},

        eventId: undefined,

        initialize: function initialize(options) {
            if (!this.collection) {
                this.eventId = options.eventId;
            } else {
                this.eventId = this.collection.meta('eventId');
            }
            this.id = options.id;
        },

        url: function() {
            return config.baseUrl + 'Occurrence/' + (!this.id ? '' : this.id);
        }

    })

});
