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
        url: function() {
            return config.baseUrl + '/Reservation/' + (!_.isUndefined(this.id) ? this.id : '');
        }
    });

});
