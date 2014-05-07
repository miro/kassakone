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
            var listing = <Listing />;

            this.chrome.setProps({
                content: listing
            });
        },

        search: function() {
            this.chrome.setProps({
                content: <Search />
            });
        }
    });
});
