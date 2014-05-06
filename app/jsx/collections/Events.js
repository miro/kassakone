define([
	'underscore',
	'backbone'
], function (
	_,
	Backbone
) {

	return Backbone.Collection.extend({

		parse: function(resp, options) {
			// implement here mockDB parsing
		}
	});
});