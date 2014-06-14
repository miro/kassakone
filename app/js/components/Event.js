/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var EventComponent = React.createClass({displayName: 'EventComponent',
        render: function() {
            var href = "/#event/" + this.props.model.get('id');
            
            return React.DOM.div( {className:"event-component"}, 
                React.DOM.h4( {className:"name title"}, 
                    this.props.model.get('name')
                ),

                React.DOM.div( {className:"meta"}, 
                    React.DOM.p( {className:"description"}, 
                        this.props.model.get('description')
                    )
                ),

                React.DOM.a( {href:href}, 
                    React.DOM.button( {className:"small-button"}, "Details")
                )
            );
        }
    });
    return EventComponent;
});
