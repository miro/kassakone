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
    var EventOccurrence = React.createClass({

        mixins: [rbbMixin],
        updateOnProps: { 'model': 'model' },

        render: function() {
            return (
                <div className="occurrence-component clearfix">
                    <div className="info">
                        <p>
                            <span className="date">{moment(this.props.model.get('startTime')).format('DD.MM.YY HH:mm')} </span>
                            <span className="price">{this.props.model.get('price')} &euro;</span>
                        </p>
                        <p className="status">
                            Tickets reserved: {this.props.model.get('reservedReservationCount')}
                        </p>
                        <p className="status">
                            Tickets redeemed: {this.props.model.get('redeemedReservationCount')}
                        </p>
                        
                    </div>
    
                    <button onClick={this.moveToOccurrencePage} className="infobutton small-button">Info</button>
                </div>
            )
        },

        moveToOccurrencePage: function moveToOccurrencePage() {
            app.router.jumpToOccurrence(this.props.model);
        }

    });
    return EventOccurrence;
});
