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
    app,
    Chrome,
    ListingPage,
    SearchPage,
    EventPage,
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
            var listing = <ListingPage events={app.data.events} />;

            this.chrome.setProps({
                content: listing
            });

            app.refreshData();
        },

        search: function() {
            this.chrome.setProps({
                content: <SearchPage />
            });
        },

        event: function(id) {
            var eventModel = new EventModel({id: id});
            eventModel.fetch()
            this.chrome.setProps({
                content: <EventPage eventId={id} model={eventModel}/>
            });
        }
    });
});
