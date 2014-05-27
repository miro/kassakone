/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var Container = React.createClass({displayName: 'Container',
        render: function() {
            return (
                React.DOM.div( {className:"container"}, 
                    this.props.content
                )
            );
        }
    });
    
    return Container;
});
