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
        url: config.baseUrl + '/Reservation',
        model: Reservation
	});

});
