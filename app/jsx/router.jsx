/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'app',
    'components/Chrome',
    'pages/Listing',
    'pages/Search',
    'pages/Event',
    'models/Event'
    
], function(
    Backbone,
    React,
    App,
    Chrome,
    Listing,
    Search,
    Event,
    EventModel
) {

    return Backbone.Router.extend({

        chrome: undefined, // the root component
        
        routes: {
            "(/)": "listing",
            "search": "search",
            "event/:id": "event"
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
        },

        event: function(id) {
            var eventModel = new EventModel({id: id});
            eventModel.fetch();
            this.chrome.setProps({
                content: <Event eventId={id} model={eventModel}/>
            });
        }
    });
});
