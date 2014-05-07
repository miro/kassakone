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
            'Name': null,
            'Description': null
        }
    });
    
});
