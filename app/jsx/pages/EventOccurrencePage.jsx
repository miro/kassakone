/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'react-backbone',
    'components/Reservation'
], function(
    _,
    React,
    rbbMixin,
    ReservationComponent
) {

    var EventOccurrencePage = React.createClass({

        mixins: [rbbMixin],

        updateOnProps: {
            occurrence: 'model',
            reservations: 'collection'
        },
        
        render: function() {
            var reservations = [];
            _.each(this.props.reservations.models, function(reservation) {
                reservations.push(<ReservationComponent model={reservation} />);
            });

            return <div className="occurrence-page">
                <h3 className="title">
                    {moment(this.props.occurrence.get('startTime')).format('DD.MM.YY HH:mm')}
                </h3>

                <div className="info">
                    <p className="price">
                        {this.props.occurrence.get('price')} &euro;
                    </p>
                    <p className="status">
                        Tickets reserved {this.props.occurrence.get('reservedPlaces')} + {this.props.occurrence.get('totalPlaces')} / {this.props.occurrence.get('soldPlaces')}
                    </p>
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
