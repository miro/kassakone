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
            'id': null,
            'expired': null,
            'redeemed': null
            /*'ID': null,
            'EventOccurancesID': null,
            'Name': null,
            'Amount': null*/
        },

        url: function() {
            return config.baseUrl + '/Reservation/' + (!_.isUndefined(this.id) ? this.id : '');
        }
    });

});
