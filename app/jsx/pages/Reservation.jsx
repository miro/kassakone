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
        
        render: function() {

            return <div className={"reservation"}>
                <h3 className={"id"}>
                    ID:  {this.props.model.get('id')}
                </h3>
                <p className={"expired"}>
                    Expired: {this.props.model.get('expired') ? 'YES' : 'NO'}
                </p>
                <p className={"redeemed"}>
                    Redeemed: {this.props.model.get('redeemed') ? 'YES' : 'NO'}
                </p>
            </div>
        }

    });
    return Listing;
});
