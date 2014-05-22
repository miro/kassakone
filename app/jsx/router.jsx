/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'app',
    'credentials',
    'components/Chrome',
    'pages/Listing',
    'pages/Search',
    'pages/Event',
    'pages/Login',
    'models/Event'
    
], function(
    Backbone,
    React,
    app,
    credentials,
    Chrome,
    ListingPage,
    SearchPage,
    EventPage,
    LoginPage,
    EventModel
) {

    return Backbone.Router.extend({

        chrome: undefined, // the root component
        
        routes: {
            "(/)": "listing",
            "search": "search",
            "login": "login",
            "event/:id": "event"
        },

        initialize: function() {
            app.refreshData();

            if (!this.chrome) {
                this.chrome = React.renderComponent(
                    <Chrome />,
                    document.getElementById('root')
                );          
            }
        },

        login: function() {
            this.chrome.setProps({
                content: <LoginPage />
            });
        },

        listing: function() {
            var listing = <ListingPage events={app.data.events} />;

            this.chrome.setProps({
                content: listing
            });
        },

        search: function() {
            this.chrome.setProps({
                content: <SearchPage />
            });
        },

        event: function(id) {
            var eventModel = new EventModel({id: id});
            eventModel.fetch();

            this.chrome.setProps({
                content: <EventPage 
                    eventId={id} 
                    model={eventModel}
                    occurrences={app.data.eventOccurrences} />
            });
        }
    });
});
