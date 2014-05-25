/** @jsx React.DOM */

define([
    'backbone',
    'react',
    'app',
    'credentials',
    'components/Chrome',
    'pages/EventsListPage',
    'pages/SearchPage',
    'pages/EventPage',
    'pages/LoginPage',
    'pages/ReservationPage',
    'models/Event',
    'models/Reservation'
    
], function(
    Backbone,
    React,
    app,
    credentials,
    Chrome,
    EventsListPage,
    SearchPage,
    EventPage,
    LoginPage,
    ReservationPage,
    EventModel,
    ReservationModel
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
            "event/:id": "event",
            "reservation/:id": "reservation"
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
                var listing = <EventsListPage events={app.data.events} />;

                this.chrome.setProps({
                    content: listing
                });
            }
        },

        event: function(id) {
            if (this.checkCredentials()) {
                var eventModel = new EventModel({id: id});

                function updateWhenLoaded() {
                    this.chrome.setProps({
                        content: <EventPage 
                            eventId={id} 
                            model={eventModel}
                            occurrences={app.data.eventOccurrences} />
                    }); 
                }

                function loadOccurrences() {
                    app.data.eventOccurrences.meta('eventId', id);
                    return app.data.eventOccurrences.fetch();
                }

                eventModel
                    .fetch()
                    .then(loadOccurrences)
                    .then(updateWhenLoaded.bind(this));
            }
        },

        reservation: function(id) {
            if (this.checkCredentials()) {
                var reservationModel = new ReservationModel({id: id});
                
                function updateWhenLoaded() {
                    this.chrome.setProps({
                        content: <ReservationPage 
                            reservationId={id} 
                            model={reservationModel} />
                    });
                }

                reservationModel.fetch().then(updateWhenLoaded.bind(this));
            }
        }
    });
});
