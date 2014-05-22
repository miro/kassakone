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
            // TODO tää varmaan kannattais tehä jossai muualla kun renderissä, vai? nyt joka kerta räjäytetään kaikki meiän modelit!
            var eventModels = this.props.events.models;
            var eventComponents;

            function toComponent(model) {
                var event = <Event key={model.cid} model={model} />;
                return event;
            }

            eventComponents = eventModels.map(toComponent);

            return (
                <div>
                    {eventComponents}
                </div>
            );
        }
    });
    return Listing;
});
