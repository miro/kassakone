/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'app',
    'jquery',
    'moment',
    'models/Reservation',
    'react-backbone'
], function(
    _,
    React,
    app,
    $,
    moment,
    ReservationModel,
    rbbMixin
) {

    var Listing = React.createClass({

        mixins: [rbbMixin],
        updateOnProps: {
            'model': 'model'
         },

        redeemReservation: function() {
            this.props.model.set({'status':'REDEEMED'});
            this.props.model.save();
            console.log("Redeemed reservation");
        },

        undoRedemption: function() {
            this.props.model.set({'status':'RESERVED'});
            this.props.model.save();
            console.log("Cancelled redemption");
        },

        cancelReservation: function() {
            if (confirm('Are you sure you want to delete this reservation?')) {
                this.props.model.destroy();
                app.navigate('');
            }
        },
        
        render: function() {
            var reservationStatus = this.props.model.get('status');
            var reservationStatusDescription;
            var reserverDescription = "";
            var sellerDescription = "";
            var buttons = [];

            switch (reservationStatus) {
                case "RESERVED":
                    reservationStatusDescription = 'Reservation expires ' + moment(this.props.model.get('keke')).format('DD.MM.YY HH:mm');
                    buttons.push(<button className="button" onClick={this.redeemReservation}>Redeem reservation</button>);
                    buttons.push(<button className="button" onClick={this.cancelReservation}>Delete reservation</button>);
                    break;

                case "REDEEMED":
                    reservationStatusDescription = 'Reservation redeemed';
                    buttons.push(<button className="button" onClick={this.undoRedemption}>Undo redemption</button>);
                    break;
                case "CANCELLED":
                    reservationStatusDescription = 'Reservation cancelled';
                    break;

                case "EXPIRED":
                    reservationStatusDescription = 'Reservation expired';
                    break
            }

            if (this.props.model.get('reserver')) {
                reserverDescription = " / " + this.props.model.get('reserver');
            } else {
                sellerDescription = "This item was sold by " + this.props.model.get('seller');
            }

            return <div className={"reservation"}>
                <h3 className={"id"}>
                    Reservation ID: {this.props.model.get('id')}{reserverDescription}
                </h3>

                <h3>{sellerDescription}</h3>
                <p>{reservationStatusDescription}</p>

                <div className="buttons">{buttons}</div>
            </div>
        }

    });
    return Listing;
});
