/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var Container = React.createClass({
        render: function() {
            return (
                <div>
                    {this.props.content}
                </div>
            );
        }
    });
    
    return Container;
});
