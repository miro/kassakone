/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var Event = React.createClass({
        render: function() {
            var href = "/#event/" + this.props.model.get('id');
            return (
                <div className="event">
                    <h3 className="name">
                        {this.props.model.get('name')}
                    </h3>
                    <div className="meta">
                        <p className="description">
                            {this.props.model.get('description')}
                        </p>
                    </div>
                    <div className="buttons">
                        <a href={href} className="small-button">Details</a>
                    </div>
                </div>
            );
        }
    });
    return Event;
});
