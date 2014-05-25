/** @jsx React.DOM */

define([
    'react',
    'react-backbone',
    'moment'
], function(
    React,
    rbbMixin,
    moment
) {
    var EventOccurrence = React.createClass({

        mixins: [rbbMixin],
        updateOnProps: { 'model': 'model' },

        render: function() {
            var href = "/#event/occurrence/" + this.props.model.get('id');

            return <div className="occurrence-component clearfix">
                <div className="info">
                    <div className="date">
                        <span className="date">{moment(this.props.model.get('date')).format('DD.MM.YY HH:mm')}</span>
                    </div>
                    <div className="status">
                        Tickets reserved {this.props.model.get('reservedPlaces')} + {this.props.model.get('totalPlaces')} / {this.props.model.get('soldPlaces')}
                    </div>
                </div>
                <div className="buttons">
                    <a href={href} className="small-button">Info</a>
                </div>
            </div>

        }
    });
    return EventOccurrence;
});
