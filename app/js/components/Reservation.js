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

        render: function() {
            
            var statusNode; 
            if (this.props.model.get('redeemed')) {
                statusNode = React.DOM.div( {className:"status redeemed"}, 
                    "Redeemed"
                );
            } else {
                statusNode = React.DOM.div( {className:"status"}, 
                    "Open"
                );
            }

            return React.DOM.div( {className:"reservation-component clearfix"}, 
                React.DOM.div( {className:"id"}, 
                    this.props.model.get('id')
                ),
                statusNode
            );
            
        },

        moveToOccurrencePage: function moveToOccurrencePage() {
            app.router.jumpToOccurrence(this.props.model);
        }

    });
    return ReservationComponent;
});
