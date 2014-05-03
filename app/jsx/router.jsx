/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'js/components/TestComponent'
], function(Backbone, React, TestComponent) {
    var Router = Backbone.Router.extend({
        routes: {
            "": "index" 
        },
        index: function() {
            React.renderComponent(
                <TestComponent />,
                document.getElementById('root')
            );
        }
    });

    return function RouterWrapper() {
        var router = new Router();
        Backbone.history.start();
        console.log("App started");
    };
});