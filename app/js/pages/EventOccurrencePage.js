/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'moment',
    'app',
    'react-backbone',
    'config',
    'components/Reservation',
    'models/Reservation',
    'models/Event'
], function(
    _,
    React,
    moment,
    app,
    rbbMixin,
    config,
    ReservationComponent,
    ReservationModel,
    EventModel
) {

    var EventOccurrencePage = React.createClass({displayName: 'EventOccurrencePage',

        mixins: [rbbMixin],

        updateOnProps: {
            occurrence: 'model',
            eventModel: 'model',
            reservations: 'collection'
        },


        componentWillMount: function() {
            this.startUpdater();
        },

        componentWillUnmount: function() {
            this.stopUpdater();
        },

        getDefaultProps: function() {
            var self = this;
            var eventModel = _.find(app.data.events.models, function(e) {
                return e.get('id') == self.props.occurrence.eventId;
            });

            if (!eventModel) {
                eventModel = new EventModel({id: this.props.occurrence.eventId});
                eventModel.fetch();
            }
            
            return {eventModel: eventModel};
        },

        sellTicket: function sellTicket() {
            var self = this;
            var reservationModel = new ReservationModel();
            reservationModel.occurrenceId = this.props.occurrence.get('id');
            reservationModel.save({
                success: function(model) {
                    self.props.reservations.add(this);
                }
            });
            this.props.reservations.add(reservationModel);
        },
        
        render: function() {

            var reservations = [];
            _.each(this.props.reservations.models, function(reservation) {
                reservations.push(ReservationComponent( {model:reservation, key:reservation.get('id')} ));
            });
            

            // Alter BuyButton based on if the occurrence has already begun
            var buyButton = [];
            if (moment(this.props.occurrence.get('startTime')).isAfter(moment())) {
                buyButton.push(React.DOM.button( {id:"sellticket", onClick:this.sellTicket}, "Sell Ticket"));
            }
            else {
                buyButton.push(React.DOM.p(null, "Occurrence has started"));
            }


            return React.DOM.div( {className:"occurrence-page"}, 
                React.DOM.h3( {className:"title"}, 
                    this.props.eventModel.get('name'), 
                    moment(this.props.occurrence.get('startTime')).format(' DD.MM.YY HH:mm')
                ),

                React.DOM.div( {className:"meta clearfix"}, 
                    React.DOM.div( {className:"info"}, 
                        React.DOM.p( {className:"status"}, 
                            "Tickets redeemed: ", this.props.reservations.getRedeemedCount()
                        ),
                        React.DOM.p( {className:"status"}, 
                            "Tickets reserved: ", this.props.reservations.getReservedCount()
                        ),
                        React.DOM.p( {className:"status"}, 
                            "= ", this.props.occurrence.get('redeemedReservationCount') + this.props.occurrence.get('reservedReservationCount')
                        ),


                        React.DOM.p( {className:"price"}, 
                            "Ticket price: ", this.props.occurrence.get('price'), " €"
                        )
                    )
                ),

                buyButton,

                React.DOM.h4( {className:"title"}, "Reservations"),

                React.DOM.div( {className:"reservations"}, 
                    reservations
                )
            );
        },

        startUpdater: function() {
            var that = this;
            this.updater = setInterval(function() {
                that.updateReservations();
            }, config.pollInterval);
        },

        stopUpdater: function() {
            clearInterval(this.updater);
        },

        updateReservations: function() {
            this.props.reservations.fetch();
        }


    });

    return EventOccurrencePage;
});
