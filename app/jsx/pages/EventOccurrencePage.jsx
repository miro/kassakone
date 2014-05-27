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

    var EventOccurrencePage = React.createClass({

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
                reservations.push(<ReservationComponent model={reservation} key={reservation.get('id')} />);
            });

            return <div className="occurrence-page">
                <h3 className="title">
                    {moment(this.props.occurrence.get('startTime')).format('DD.MM.YY HH:mm')}
                </h3>

                <div className="meta clearfix">
                    <div className="info">
                        <p className="price">
                            {this.props.occurrence.get('price')} &euro;
                        </p>

                        <p className="status">
                            Tickets reserved {this.props.occurrence.get('reservedPlaces')} + {this.props.occurrence.get('totalPlaces')} / {this.props.occurrence.get('soldPlaces')}
                        </p>
                    </div>

                    <button id="sellticket" onClick={this.sellTicket}>Sell Ticket</button>
                </div>

                


                <h4 className="title">Reservations</h4>

                <div className="reservations">
                    {reservations}
                </div>
            </div>;
        }

    });

    return EventOccurrencePage;
});
