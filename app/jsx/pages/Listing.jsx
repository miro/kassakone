/** @jsx React.DOM */

define([
    'react',
    'components/Event'
], function(
    React,
    Event
) {
    var Listing = React.createClass({
    
        render: function() {
            function toComponent(model) {
                var event = <Event model={model} />;
                return event;
            }

            var eventModels = this.props.events.models;
            var eventComponents = eventModels.map(toComponent);

            return (
                <ul>
                    {eventComponents}
                </ul>
            );
        }
    });
    return Listing;
});
