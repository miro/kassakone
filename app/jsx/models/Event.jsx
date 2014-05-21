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
            name: 'tempname'
        },

        url: config.baseUrl + '/api/mock/eventtest.json'
    });
    
});
