/** @jsx React.DOM */

define([
    'react',
    'credentials'
], function(
    React,
    credentials
) {
    var Navigation = React.createClass({displayName: 'Navigation',
        render: function() {
            return React.DOM.div( {className:"navigation-bar"}, 
                React.DOM.h1( {className:"title"}, "RIOT"),
                React.DOM.div( {className:"links clearfix"}, 
                    React.DOM.a( {href:"#"}, React.DOM.button( {className:"events"}, "Events")),
                    React.DOM.a( {href:"#search"}, React.DOM.button( {className:"search"}, "Search")),
                    React.DOM.a( {href:"#logout"}, React.DOM.button( {className:"logout"}, "Logout"))
                )  
            );
        }
    });
    
    return Navigation;
});
