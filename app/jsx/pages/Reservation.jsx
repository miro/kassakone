/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'components/Reservation',
    'app',
    'jquery',
    'models/Reservation'
], function(
    _,
    React,
    Reservation,
    App,
    $,
    ReservationModel
) {

    var Listing = React.createClass({

        mixins: [React.Backbone],
        updateOnProps: {
            'model': 'model'
         },
        
        render: function() {

            return <div className={"reservation"}>
                <h3 className={"name"}>
                    Name:  {this.props.model.get('Name')}
                </h3>
                <p className={"amount"}>
                    Amount: {this.props.model.get('Amount')}
                </p>
            </div>
        }

    });
    return Listing;
});
