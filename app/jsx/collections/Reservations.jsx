define([
	'underscore',
	'backbone',
    'models/Reservation',
    'config'
], function (
	_,
	Backbone,
    Reservation,
    config
) {

	return Backbone.Collection.extend({
     	model: Reservation,
        occurrenceId: null,
        
        url: function url() {
            if (!this.occurrenceId) {
                throw new Error("Must set an occurrenceId before trying to fetch reservations for an event occurrence.");
            }

            return config.baseUrl + 'Occurrence/' + this.occurrenceId + '/Reservation';
        },

        comparator: function(model) {
            switch (model.get('status')) {
                case "RESERVED":
                    return 1;
                case "REDEEMED":
                    return 2;
                case "CANCELLED":
                    return 3;
                case "EXPIRED":
                    return 4;
                default:
                    return 5;
            }
        } 
	});

});
