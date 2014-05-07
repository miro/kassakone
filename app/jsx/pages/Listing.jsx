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
        getInitialState: function() {
            return {
                events: null // A Backbone collection loaded in componentDidMount
            };
        },
        
        render: function() {
            var eventModels = [],
                eventComponents = [];

            function toComponent(model) {
                var event = <Event key={model.cid} model={model} />;
                return event;
            }

            if(this.state.events) {
                eventModels = this.state.events.models;
                eventComponents = eventModels.map(toComponent);
            }

            return (
                <ul>
                    {eventComponents}
                </ul>
            );
        },

        componentDidMount: function() {
            var self = this;

            App.data.events.fetch({
                success: function success(collection, response, options) {
                    self.setState({
                        events: collection
                    });
                    console.log("Fetched events!", collection.toJSON());
                },
                fail: function() {
                    console.log("Failed to fetch events. :(");
                }
            });            
        }

    });
    return Listing;
});
