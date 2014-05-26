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
    'models/Reservation',
    'collections/OccurrenceReservations', // These are disposable. Not meant for storing.
    'pages/EventOccurrencePage'
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
    ReservationModel,
    OccurrenceReservations,
    EventOccurrencePage
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

        // Helper functions --------------------------------

        // jumpTo - shortcut for navigate
        jumpTo: function(route) { 
            this.navigate(route, {trigger: true});
            // TODO: change navigation buttons state here?
        },

        // checkCredentials - checks if user is authorized
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
        },
        // jumpToReservation (bad function name, we need something more describing)
        // used to show the reservation page when the model is already fetched. This happens
        // when searching for reservation
        jumpToReservation: function(reservationModel) {
            if (this.checkCredentials()) {
                window.history.pushState("", "", "/#reservation/" + reservationModel.id);
                Backbone.history.checkUrl();
                this.chrome.setProps({
                    content: <ReservationPage 
                        reservationId={reservationModel.id} 
                        model={reservationModel} />
                });
            }
        },

        jumpToOccurrence: function(occurrenceModel) {
            if (this.checkCredentials()) {
                window.history.pushState("", "", "/#occurrence/" + occurrenceModel.id);
                Backbone.history.checkUrl();

                var occurrenceReservations = new OccurrenceReservations({
                    occurrenceId: occurrenceModel.get('id')
                });

                function onOccurrenceDataLoaded() {
                    this.chrome.setProps({
                        content: <EventOccurrencePage 
                            occurrence={occurrenceModel} 
                            reservations={occurrenceReservations} />
                    });
                }

                function onFailure() {
                    console.log("Failed to load data from url ", "/#occurrence/" + occurrenceModel.id);
                }

                occurrenceReservations.fetch()
                    .then(onOccurrenceDataLoaded.bind(this))
                    .fail(onFailure.bind(this));
            }
        },

        search: function() {
            if (this.checkCredentials()) {
                this.chrome.setProps({
                    content: <SearchPage />
                });
            }
        }
    });
});
