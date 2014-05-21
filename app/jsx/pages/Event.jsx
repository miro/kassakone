/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'components/Event',
    'app',
    'jquery',
    'models/Event'
], function(
    _,
    React,
    Event,
    App,
    $,
    EventModel
) {

    var Listing = React.createClass({

        mixins: [React.Backbone],

        getBackboneModels: function() {
            return this.props.model;
        },

        getInitialState: function() {
            // debugger;
            // this.props.model.fetch();
            return null;
        },
        
        render: function() {
            return <div className={"event"}>
                <h3 className={"name"}>
                    {this.props.model.get('name')}
                </h3>
                <p className={"description"}>
                    {this.props.model.get('description')}
                </p>
            </div>
        },

        componentWillUpdate: function componentWillUpdate(object nextProps, object nextState) {
            debugger;
        }

    });
    return Listing;
});
