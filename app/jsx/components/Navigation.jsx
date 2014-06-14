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
            return <div className="navigation-bar">
                <h1 className="title">RIOT</h1>
                <div className="links">
                    <a href="#">Events</a>
                    <a href="#search">Search</a>
                    <a href="#logout">Logout</a>
                </div>  
            </div>;
        }
    });
    
    return Navigation;
});
