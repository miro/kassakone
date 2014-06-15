/** @jsx React.DOM */

define([
    'react',
    'components/Event',
    'config',
    'react-backbone'
], function(
    React,
    Event,
    config,
    rbbMixin
) {
    var EventsListPage = React.createClass({
        
        mixins: [rbbMixin],
        updateOnProps: { events: 'collection'},

        componentWillMount: function() {
            this.startUpdater();
        },

        componentWillUnmount: function() {
            this.stopUpdater();
        },

        render: function() {
            // TODO tää varmaan kannattais tehä jossai muualla kun renderissä, vai? nyt joka kerta räjäytetään kaikki meiän modelit!
            var eventModels = this.props.events.models;
            var eventComponents;

            function toComponent(model) {
                var eventComponent = <Event key={model.cid} model={model} />;
                return eventComponent;
            }

            eventComponents = eventModels.map(toComponent);

            return <div className="event-page">
                <h4 className="location">Events</h4>
                {eventComponents}
            </div>;
        },

        startUpdater: function() {
            var that = this;
            this.updater = setInterval(function() {
                that.updateReservations();
            }, config.pollInterval);
        },

        stopUpdater: function() {
            clearInterval(this.updater);
        },

        updateReservations: function() {
            this.props.events.fetch();
        }
    });
    return EventsListPage;
});
