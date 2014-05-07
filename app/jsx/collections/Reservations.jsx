define([
	'underscore',
	'backbone',
    'models/Reservation'
], function (
	_,
	Backbone,
    Reservation
) {

	return Backbone.Collection.extend({
        url: '/api/mock/reservation.json',
        model: Reservation
	});

});
