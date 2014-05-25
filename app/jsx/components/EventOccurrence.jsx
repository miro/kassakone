/** @jsx React.DOM */

define([
    'react',
    'react-backbone'
], function(
    React,
    rbbMixin
) {
    var EventOccurrence = React.createClass({

        mixins: [rbbMixin],
        updateOnProps: { 'model': 'model' },

        render: function() {
            var href = "/#event/occurrence" + this.props.model.get('id');

            return <div className="occurrence">
                <div className="date">
                    <span className="date">{this.props.model.get('date')}</span>
                    <span className="start-time">{this.props.model.get('startTime')}</span>
                </div>
                <div className="status">
                    {this.props.model.get('reservedPlaces')} + {this.props.model.get('totalPlaces')} / {this.props.model.get('soldPlaces')}
                </div>
                <div className="buttons">
                    <a href={href} className="small-button">Details</a>
                </div>
            </div>

        }
    });
    return EventOccurrence;
});
