/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'app',
    'jquery',
    'moment',
    'models/Event',
    'components/EventOccurrence',
    'components/Event',
    'react-backbone'
], function(
    _,
    React,
    App,
    $,
    moment,
    EventModel,
    EventOccurrence,
    Event,
    rbbMixin
) {
    var EventPage = React.createClass({

        mixins: [rbbMixin],

        updateOnProps: {
            model: 'model',
            occurrences: 'collection'
        },

        getInitialState: function() {
            return {};
        },

        duration: function() {
            var occurrence = this.props.occurrences.models[0];
            if (!_.isUndefined(occurrence)) {
                var startMoment = moment(occurrence.get('startTime'));
                var endMoment = moment(occurrence.get('endTime'));
                return moment.utc(endMoment.diff(startMoment)).format('HH:mm');
            } else {
                return undefined;
            }
        },
        
        render: function() {
            // TODO onko tätä järkeä tehä renderissä vai rendataanko tämä aina vaan kerran??
            var occurrenceModels = this.props.occurrences.models;
            var eventOccurrenceComponents = []; 

            _.each(occurrenceModels, function(model) {
                eventOccurrenceComponents.push(<EventOccurrence model={model} key={model.id} />);
            });

            return (
                <div className="event">
                    <h2 className="name">
                        {this.props.model.get('name')}
                    </h2>
                    <p className="description">
                        {this.props.model.get('description')}
                    </p>
                    <p className="duration">
                        Duration: {this.duration()}
                    </p>

                    <hr />

                    <h3>Occurrences</h3>
                    <div className="occurrences">
                        {eventOccurrenceComponents}
                    </div>
                </div>
            )
        }

    });
    return EventPage;
});
