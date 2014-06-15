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

    var EventOccurrencePage = React.createClass({

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
            if(!confirm('Do you want to sell one ticket to this occurrence?')) return;

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
            

            // Alter BuyButton based on if the occurrence has already begun
            var buyButton = [];
            if (moment(this.props.occurrence.get('startTime')).isAfter(moment())) {
                buyButton.push(<button id="sellticket" onClick={this.sellTicket}>Sell Ticket</button>);
            }
            else {
                buyButton.push(<p>Occurrence has started</p>);
            }


            return <div className="occurrence-page">
                <h4 className="location">Occurrence</h4>
                <h3 className="title">
                    {this.props.eventModel.get('name')} 
                    {moment(this.props.occurrence.get('startTime')).format(' DD.MM.YY HH:mm')}
                </h3>

                <div className="meta clearfix">
                    <div className="info">
                        <p className="status">
                            Tickets redeemed: {this.props.reservations.getRedeemedCount()}
                        </p>
                        <p className="status">
                            Tickets reserved: {this.props.reservations.getReservedCount()}
                        </p>
                        <p className="status">
                            &#61; {this.props.occurrence.get('redeemedReservationCount') + this.props.occurrence.get('reservedReservationCount')}
                        </p>


                        <p className="price">
                            Ticket price: {this.props.occurrence.get('price')} &euro;
                        </p>
                    </div>
                </div>

                {buyButton}

                <h4 className="title">Reservations</h4>

                <div className="reservations">
                    {reservations}
                </div>
            </div>;
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
