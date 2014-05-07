define([
    'underscore',
    'backbone'
], function (
    _,
    Backbone
) {

    return Backbone.Model.extend({
        defaults: {
            'ID': null,
            'EventOccurancesID': null,
            'Name': null,
            'Amount': null
        }
    });

});
