/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var EventOccurrence = React.createClass({

        // mixins: [React.Backbone],
        // updateOnProps: { 'model': 'model' },

        render: function() {
            console.log(this.props.model.toJSON());

            return (
                <div className="occurrence">
                    <div className="date">
                        <span className="date">{this.props.model.get('date')}</span>
                        <span className="start-time">{this.props.model.get('startTime')}</span>
                    </div>
                    <div className="status">
                        {this.props.model.get('reservedPlaces')} + {this.props.model.get('totalPlaces')} / {this.props.model.get('soldPlaces')}
                    </div>
                </div>
            );
        }
    });
    return EventOccurrence;
});
