/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var Container = React.createClass({
        render: function() {
            return (
                <div className="container">
                    {this.props.content}
                </div>
            );
        }
    });
    
    return Container;
});
