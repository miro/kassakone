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


        componentDidMount: function() {
            this.props.model.on('change', function() {
              this.forceUpdate();
            }.bind(this));
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
        }

    });
    return Listing;
});
