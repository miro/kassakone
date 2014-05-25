/** @jsx React.DOM */

define([
    'react',
    'credentials'
], function(
    React,
    credentials
) {
    var Navigation = React.createClass({
        render: function() {
            return (
                <div>
                    <a href="#search">Search</a> | <a href="#">Home</a> | <a href="#something">Something</a> | <a href="#logout">Logout</a>
                </div>
            );
        }
    });
    
    return Navigation;
});
