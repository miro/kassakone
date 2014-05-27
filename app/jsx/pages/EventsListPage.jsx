/** @jsx React.DOM */

define([
    'react',
    'components/Event',
    'app',
    'react-backbone'
], function(
    React,
    Event,
    App,
    rbbMixin
) {
    var EventsListPage = React.createClass({
        
        mixins: [rbbMixin],
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

            return <div className="event-page">
                {eventComponents}
            </div>;
        }
    });
    return EventsListPage;
});
