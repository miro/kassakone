/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'components/Event',
    'app',
    'jquery',
    'models/Event',
    'components/EventOccurrence',
    'react-backbone'
], function(
    _,
    React,
    Event,
    App,
    $,
    EventModel,
    OccurrenceComponent,
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
            var occurrenceComponents = []; 

            _.each(occurrenceModels, function(model) {
                occurrenceComponents.push(<OccurrenceComponent model={model} key={model.id} />);
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
                        {occurrenceComponents}
                    </div>
                </div>
            )
        }

    });
    return EventPage;
});
