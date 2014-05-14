/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'components/Chrome',
    'pages/Listing',
    'pages/Search',
    'app'
], function(
    Backbone,
    React,
    Chrome,
    Listing,
    Search,
    App
) {

    return Backbone.Router.extend({

        chrome: undefined, // the root component
        
        routes: {
            "(/)": "listing",
            "search": "search"
        },

        initialize: function() {
            if (!this.chrome) {
                this.chrome = React.renderComponent(
                    <Chrome />,
                    document.getElementById('root')
                );                
            }
        },

        listing: function() {
            var listing = <Listing events={App.data.events} />;

            this.chrome.setProps({
                content: listing
            });

            App.refreshData();
        },

        search: function() {
            this.chrome.setProps({
                content: <Search />
            });
        }
    });
});
