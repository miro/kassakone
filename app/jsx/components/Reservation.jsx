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
    var ReservationComponent = React.createClass({

        mixins: [rbbMixin],
        updateOnProps: { 'model': 'model' },

        statusClick: function() {
            app.router.jumpToReservation(this.props.model);
        },

        render: function() {   
            var statusClass = "status "; 
            statusClass += this.props.model.get('redeemed') ? "redeemed" : "";

            return <div className="reservation-component clearfix">
                <div className="id">
                    {this.props.model.get('id')}
                </div>
                <button className={statusClass} onClick={this.statusClick}>
                    {
                        this.props.model.get('redeemed') ? 
                        "Redeemed" : "Open"
                    }
                </button>
            </div>;
            
        },

        moveToOccurrencePage: function moveToOccurrencePage() {
            app.router.jumpToOccurrence(this.props.model);
        }

    });
    return ReservationComponent;
});
