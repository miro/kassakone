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
        
        render: function() {
            // TODO onko tätä järkeä tehä renderissä vai rendataanko tämä aina vaan kerran??
            var occurrenceModels = this.props.occurrences.models;
            var occurrenceComponents = []; 

            _.each(occurrenceModels, function(model) {
                occurrenceComponents.push(<OccurrenceComponent model={model} />);
            });

            return (
                <div className="event">
                    <h3 className="name">
                        {this.props.model.get('name')}
                    </h3>
                    <p className="description">
                        {this.props.model.get('description')}
                    </p>
    
                    <div className="occurrences">
                        {occurrenceComponents}
                    </div>
                </div>
            )
        }

    });
    return EventPage;
});
