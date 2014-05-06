/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var Event = React.createClass({
        render: function() {
            return (
                <p>
                    Event: {this.props.Name}
                </p>
            );
        }
    });
    return Event;
});
