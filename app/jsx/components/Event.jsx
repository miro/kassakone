/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var Event = React.createClass({
        render: function() {
            return (
                <div className={"event"}>
                    <h3 className={"name"}>
                        {this.props.model.get('Name')}
                    </h3>
                    <p className={"description"}>
                        {this.props.model.get('Description')}
                    </p>
                </div>
            );
        }
    });
    return Event;
});
