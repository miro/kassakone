/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'app',
    'jquery',
    'models/Reservation',
    'react-backbone'
], function(
    _,
    React,
    App,
    $,
    ReservationModel,
    rbbMixin
) {

    var Listing = React.createClass({

        mixins: [rbbMixin],
        updateOnProps: {
            'model': 'model'
         },

        redeemReservation: function() {
            this.props.model.set({'redeemed':'true'});
            this.props.model.save();
            console.log("Redeemed reservation");
        },

        cancelRedemption: function() {
            this.props.model.set({'redeemed':'false'});
            this.props.model.save();
            console.log("Cancelled redemption");
        },
        
        render: function() {

            return <div className={"reservation"}>
                <h3 className={"id"}>
                    ID:  {this.props.model.get('id')}
                </h3>
                <p className={"expired"}>
                    {!this.props.model.get('expired') ? 
                        'Reservation expired' : 
                        'Reservation expires dd.mm.yyyy'
                    }
                </p>
                <p className={"redeemed"}>
                    {this.props.model.get('redeemed') ? 
                        <button className="button" onClick={this.cancelRedemption}>Cancel redemption</button> :
                        <button className="button" onClick={this.redeemReservation}>Redeem reservation</button>                        
                    }
                </p>
            </div>
        }

    });
    return Listing;
});
