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
                <div className="links clearfix">
                    <a href="#"><button className="events">Events</button></a>
                    <a href="#search"><button className="search">Search</button></a>
                    <a href="#logout"><button className="logout">Logout</button></a>
                </div>  
            </div>;
        }
    });
    
    return Navigation;
});
