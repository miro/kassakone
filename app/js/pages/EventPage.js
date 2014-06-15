/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'config',
    'jquery',
    'moment',
    'models/Event',
    'components/EventOccurrence',
    'components/Event',
    'react-backbone'
], function(
    _,
    React,
    config,
    $,
    moment,
    EventModel,
    EventOccurrence,
    Event,
    rbbMixin
) {
    var EventPage = React.createClass({displayName: 'EventPage',

        mixins: [rbbMixin],

        updateOnProps: {
            model: 'model',
            occurrences: 'collection'
        },

        componentWillMount: function() {
            this.startUpdater();
        },

        componentWillUnmount: function() {
            this.stopUpdater();
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
                eventOccurrenceComponents.push(EventOccurrence( {model:model, key:model.id} ));
            });

            return React.DOM.div( {className:"event-page"}, 
                React.DOM.h4( {className:"location"}, "Event"),
                React.DOM.h2( {className:"name"}, 
                    this.props.model.get('name')
                ),
                React.DOM.p( {className:"description"}, 
                    this.props.model.get('description')
                ),
                React.DOM.p( {className:"duration"}, 
                    "Duration: ", this.duration()
                ),

                React.DOM.hr(null ),

                React.DOM.h3(null, "Occurrences"),
                React.DOM.div( {className:"occurrences"}, 
                    eventOccurrenceComponents
                )
            )
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
            this.props.model.fetch();
            this.props.occurrences.fetch();
        }

    });
    return EventPage;
});
