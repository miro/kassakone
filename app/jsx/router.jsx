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
    'pages/EventOccurrencePage',
    'models/Event',
    'models/Reservation',
    'models/EventOccurrence'
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
    EventOccurrencePage,
    EventModel,
    ReservationModel,
    EventOccurrenceModel
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
            "event/:eventId/occurrence/:occurrenceId": "occurrence",
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
                reservationModel.fetch();

                this.chrome.setProps({
                    content: <ReservationPage 
                        reservationId={id} 
                        model={reservationModel} />
                });
            }
        },
        // jumpToReservation (bad function name, we need something more describing)
        // used to show the reservation page when the model is already fetched. This happens
        // when searching for reservation
        jumpToReservation: function(reservationModel) {
            if (this.checkCredentials()) {
                window.history.pushState("", "", "/#reservation/" + reservationModel.id);
                this.chrome.setProps({
                    content: <ReservationPage 
                        reservationId={reservationModel.id} 
                        model={reservationModel} />
                });
            }
        },

        occurrence: function(eventId, occurrenceId) {
            if (this.checkCredentials()) {

                var occurrenceModel = new EventOccurrenceModel({id: occurrenceId, eventId: eventId});
                occurrenceModel.fetch();

                app.data.reservations.reset([]);
                app.data.reservations.occurrenceId = occurrenceId;
                app.data.reservations.fetch();

                this.chrome.setProps({
                    content: <EventOccurrencePage 
                        occurrence={occurrenceModel} 
                        reservations={app.data.reservations} />
                });
            }
        },

        // Same thing as with jumpToReservation
        jumpToOccurrence: function(occurrenceModel) {
            if (this.checkCredentials()) {
                window.history.pushState("", "", "/#event/" + occurrenceModel.eventId + "/occurrence/" + occurrenceModel.get('id'));
                Backbone.history.checkUrl();

                app.data.reservations.reset([]);
                app.data.reservations.occurrenceId = occurrenceModel.get('id');
                app.data.reservations.fetch();

                this.chrome.setProps({
                    content: <EventOccurrencePage 
                        occurrence={occurrenceModel} 
                        reservations={app.data.reservations} />
                });
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
