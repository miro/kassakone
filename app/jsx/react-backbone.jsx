/** @jsx React.DOM */

define([
    'underscore',
    'backbone',
    'react'
], function(
    _,
    Backbone,
    React
) {
    // from http://leoasis.github.io/posts/2014/03/22/from_backbone_views_to_react/

    React.Backbone = {
        listenToProps: function(props) {
            _.each(this.updateOnProps, function(events, propName) {
                switch(events) {
                    case 'collection': 
                        events = 'add remove reset sort';
                        break;
                    case 'model':
                        events = 'change';
                }
                this.listenTo(props[propName], events, function() { this.forceUpdate(); })
                }, this)
            },

        componentDidMount: function() {
            this.listenToProps(this.props);
        },

        componentWillReceiveProps: function(nextProps) {
            this.stopListening();
            this.listenToProps(nextProps);
        },

        componentWillUnmount: function() {
            this.stopListening();
        }
    }

    _.extend(React.Backbone, Backbone.Events);

    return React.Backbone;
});