/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var EventComponent = React.createClass({
        render: function() {
            var href = "/#event/" + this.props.model.get('id');
            
            return <div className="event-component">
                <h4 className="name title">
                    {this.props.model.get('name')}
                </h4>

                <div className="meta">
                    <p className="description">
                        {this.props.model.get('description')}
                    </p>
                </div>

                <a href={href}>
                    <button className="small-button">Details</button>
                </a>
            </div>;
        }
    });
    return EventComponent;
});
