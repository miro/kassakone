/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'react-backbone',
    'components/Reservation',
    'models/Reservation'
], function(
    _,
    React,
    rbbMixin,
    ReservationComponent,
    ReservationModel
) {

    var EventOccurrencePage = React.createClass({displayName: 'EventOccurrencePage',

        mixins: [rbbMixin],

        updateOnProps: {
            occurrence: 'model',
            reservations: 'collection'
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

            return React.DOM.div( {className:"occurrence-page"}, 
                React.DOM.h3( {className:"title"}, 
                    moment(this.props.occurrence.get('startTime')).format('DD.MM.YY HH:mm')
                ),

                React.DOM.div( {className:"meta clearfix"}, 
                    React.DOM.div( {className:"info"}, 
                        React.DOM.p( {className:"price"}, 
                            this.props.occurrence.get('price'), " €"
                        ),

                        React.DOM.p( {className:"status"}, 
                            "Tickets reserved ", this.props.occurrence.get('reservedPlaces'), " + ", this.props.occurrence.get('totalPlaces'), " / ", this.props.occurrence.get('soldPlaces')
                        )
                    ),

                    React.DOM.button( {id:"sellticket", onClick:this.sellTicket}, "Sell Ticket")
                ),

                


                React.DOM.h4( {className:"title"}, "Reservations"),

                React.DOM.div( {className:"reservations"}, 
                    reservations
                )
            );
        }

    });

    return EventOccurrencePage;
});
