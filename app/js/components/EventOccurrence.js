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
    var EventOccurrence = React.createClass({displayName: 'EventOccurrence',

        mixins: [rbbMixin],
        updateOnProps: { 'model': 'model' },

        render: function() {
            return (
                React.DOM.div( {className:"occurrence-component clearfix"}, 
                    React.DOM.div( {className:"info"}, 
                        React.DOM.p(null, 
                            React.DOM.span( {className:"date"}, moment(this.props.model.get('startTime')).format('DD.MM.YY HH:mm'), " " ),
                            React.DOM.span( {className:"price"}, this.props.model.get('price'), " €")
                        ),
                        React.DOM.p( {className:"status"}, 
                            "Tickets reserved ", this.props.model.get('reservedPlaces'), " + ", this.props.model.get('totalPlaces'), " / ", this.props.model.get('soldPlaces')
                        )
                    ),
    
                    React.DOM.button( {onClick:this.moveToOccurrencePage, className:"infobutton small-button"}, "Info")
                )
            )
        },

        moveToOccurrencePage: function moveToOccurrencePage() {
            app.router.jumpToOccurrence(this.props.model);
        }

    });
    return EventOccurrence;
});
