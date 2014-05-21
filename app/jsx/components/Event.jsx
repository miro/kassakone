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
                        {this.props.model.get('name')}
                    </h3>
                    <p className={"description"}>
                        {this.props.model.get('description')}
                    </p>
                    <a href={"#event/" + this.props.model.get('id')}>
                        More info
                    </a>
                </div>
            );
        }
    });
    return Event;
});
