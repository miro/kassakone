/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'app',
    'components/Chrome',
    'pages/Listing',
    'pages/Search'
], function(
    Backbone,
    React,
    application,
    Chrome,
    Listing,
    Search
) {

    var chrome; // Shared across routes.

    function setupChrome() {
        if(!chrome) {
            chrome = React.renderComponent(
                <Chrome />,
                document.getElementById('root')
            );                
        }
    }

    var Router = Backbone.Router.extend({
        routes: {
            "(/)": "listing",
            "search": "search"
        },

        listing: function() {
            setupChrome();

            chrome.setProps({
                content: <Listing events={application.data.events} />
            });
        },

        search: function() {
            setupChrome();

            chrome.setProps({
                content: <Search />
            });
        }
    });

    return function RouterWrapper() {
        var router = new Router();
        Backbone.history.start();
        console.log("App started");
    };
});