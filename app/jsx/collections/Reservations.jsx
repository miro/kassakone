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
        url: '/api/mock/reservations.json',
        model: Reservation
	});

});
