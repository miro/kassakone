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
                    <p>
                        <span className="date">{moment(this.props.model.get('startTime')).format('DD.MM.YY HH:mm')} </span>
                        <span className="price">{this.props.model.get('price')} &euro;</span>
                    </p>
                    

                    <p className="status">
                        Tickets reserved {this.props.model.get('reservedPlaces')} + {this.props.model.get('totalPlaces')} / {this.props.model.get('soldPlaces')}
                    </p>
                </div>

                <div className="buttons">
                    <a href={href} className="small-button">Info</a>
                </div>
            </div>

        }
    });
    return EventOccurrence;
});
