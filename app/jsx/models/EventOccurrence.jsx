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
            'EventId': null,
            'Date': null,
            'StartTime': null,
            'EndTime': null,
            'TotalPlaces': null,
            'ReservedPlaces': null,
            'SoldPlaces': null
        }
    });

});
