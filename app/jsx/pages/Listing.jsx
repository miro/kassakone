/** @jsx React.DOM */

define([
    'react',
    'components/Event'
], function(
    React,
    EventComponent
) {
    var Listing = React.createClass({
    
        render: function() {
            var printEvent = function(model) {
                return <li>{model.get('Name')}</li>;
            }; 

            return (
                <ul>
                    {this.props.events.models.map(printEvent)}
                </ul>
            );
        }
    });
    return Listing;
});
