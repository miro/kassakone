/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'components/Chrome',
    'pages/Listing',
    'pages/Search'
], function(
    Backbone,
    React,
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

            var listing = <Listing />;

            chrome.setProps({
                content: listing
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
