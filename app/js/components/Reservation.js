/** @jsx React.DOM */

define([
    'react',
    'react-backbone',
    'moment',
    'app'
], function(
    React,
    rbbMixin,
    moment,
    app
) {
    var ReservationComponent = React.createClass({displayName: 'ReservationComponent',

        mixins: [rbbMixin],
        updateOnProps: { 'model': 'model' },

        statusClick: function() {
            app.router.jumpToReservation(this.props.model);
        },

        render: function() {   
            var statusClass = "status "; 
            statusClass += this.props.model.get('status') === "REDEEMED" ? "redeemed" : "";

            return React.DOM.div( {className:"reservation-component clearfix"}, 
                React.DOM.div( {className:"id"}, 
                    this.props.model.get('id')
                ),

                React.DOM.div( {className:"reserver"}, this.props.model.get('reserver')),

                React.DOM.button( {className:statusClass, onClick:this.statusClick}, 
                    this.props.model.get('status')
                )
            );
            
        },

        moveToOccurrencePage: function moveToOccurrencePage() {
            app.router.jumpToOccurrence(this.props.model);
        }

    });
    return ReservationComponent;
});
