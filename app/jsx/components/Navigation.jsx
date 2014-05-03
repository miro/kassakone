/** @jsx React.DOM */

define([
    'react'
], function(
    React
) {
    var Navigation = React.createClass({
        render: function() {
            return (
                <div>
                    <a href="#search">Search</a> | <a href="#">Home</a> | <a href="#something">Something</a>
                </div>
            );
        }
    });
    
    return Navigation;
});
