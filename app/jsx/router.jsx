/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'js/components/TestComponent',
    'js/components/TestComponent2'
], function(
    Backbone,
    React,
    TestComponent,
    TestComponent2
) {

    var Router = Backbone.Router.extend({
        routes: {
            "":             "index",
            "search":       "search"
        },

        index: function() {
            React.renderComponent(
                <TestComponent />,
                document.getElementById('root')
            );
        },

        search: function() {
            var keke = {name: "shibe"};

            React.renderComponent(
                <TestComponent2 dog={keke} />,
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