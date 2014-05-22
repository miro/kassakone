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
            "(/)": "events",
            "events": "events",
            "search": "search",
            "login": "login",
            "event/:id": "events"
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

        jumpTo: function(route) { // shortcut for navigate
            this.navigate(route, {trigger: true});
        },

        checkCredentials: function() {
            if (!credentials.authenticated()) {
                console.log('Unauthenticated, jump to login');
                this.jumpTo('login');
                return false;
            }
            return true;
        },



        // Route handlers -----------------------------------------

        login: function() {
            this.chrome.setProps({
                content: <LoginPage />
            });
        },

        events: function() {
            if (this.checkCredentials()) {

                var listing = <ListingPage events={app.data.events} />;

                this.chrome.setProps({
                    content: listing
                });
            }
        },

        search: function() {
            if (this.checkCredentials()) {
                this.chrome.setProps({
                    content: <SearchPage />
                });
            }
        },

        event: function(id) {
            if (this.checkCredentials()) {
                var eventModel = new EventModel({id: id});
                eventModel.fetch();

                this.chrome.setProps({
                    content: <EventPage 
                        eventId={id} 
                        model={eventModel}
                        occurrences={app.data.eventOccurrences} />
                });
            }
        }
    });
});
