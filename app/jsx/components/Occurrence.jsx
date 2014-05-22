/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var Occurrence = React.createClass({

        // mixins: [React.Backbone],
        // updateOnProps: { 'model': 'model' },

        render: function() {
            return (<div className={"occurrence"}>
                <p className={"date"}>
                    {this.props.model.get('date')} {this.props.model.get('startTime')}
                </p>
                <p className={"status"}>
                    {this.props.model.get('reservedPlaces')} + {this.props.model.get('totalPlaces')} / {this.props.model.get('soldPlaces')}
                </p>
            </div>);
        }
    });
    return Occurrence;
});
