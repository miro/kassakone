/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'app',
    'credentials',
    'components/Chrome',
    'pages/Listing',
    'pages/Search',
    'pages/Events',
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
    EventsPage,
    LoginPage,
    EventModel
) {

    return Backbone.Router.extend({

        chrome: undefined, // the root component
        
        // The actual routes
        routes: {
            "(/)": "events",
            "events": "events",
            "search": "search",
            "login": "login",
            "logout": "logout",
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

        logout: function() {
            credentials.logout();
            this.jumpTo('login');
        },

        events: function() {
            if (this.checkCredentials()) {
                app.data.events.fetch();
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

                app.data.eventOccurrences.meta('eventId', id);
                app.data.eventOccurrences.fetch();

                this.chrome.setProps({
                    content: <EventsPage 
                        eventId={id} 
                        model={eventModel}
                        occurrences={app.data.eventOccurrences} />
                });
            }
        }
    });
});
