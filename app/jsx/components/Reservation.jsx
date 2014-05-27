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

        render: function() {
            
            var statusNode; 
            if (this.props.model.get('redeemed')) {
                statusNode = <div className="status redeemed">
                    Redeemed
                </div>;
            } else {
                statusNode = <div className="status">
                    Open
                </div>;
            }

            return <div className="reservation-component clearfix">
                <div className="id">
                    {this.props.model.get('id')}
                </div>
                {statusNode}
            </div>;
            
        },

        moveToOccurrencePage: function moveToOccurrencePage() {
            app.router.jumpToOccurrence(this.props.model);
        }

    });
    return ReservationComponent;
});
