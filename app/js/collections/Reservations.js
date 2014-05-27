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

        parse: function discardExpiredReservations(response) {
            var validReservations = [];
            _.each(response, function(reservation) {
                if (!reservation.expired) {
                    validReservations.push(reservation);
                }
            });

            return validReservations;
        }
	});

});
