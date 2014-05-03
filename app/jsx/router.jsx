define([
    'backbone'
], function(Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            "": "index" 
        },
        index: function() {
            console.log("Index jeah");
        }
    });

    return function RouterWrapper() {
        var router = new Router();
        Backbone.history.start();
    };
});