/** @jsx React.DOM */

define([
    'react',
    'components/Event',
    'app',
    'jquery'
], function(
    React,
    Event,
    App,
    $
) {
    var Listing = React.createClass({
        
        mixins: [React.Backbone],
        updateOnProps: { events: 'collection'},

        render: function() {
            var eventModels = this.props.events.models,
                eventComponents;

            function toComponent(model) {
                var event = <Event key={model.cid} model={model} />;
                return event;
            }

            eventComponents = eventModels.map(toComponent);

            return (
                <ul>
                    {eventComponents}
                </ul>
            );
        }
    });
    return Listing;
});
