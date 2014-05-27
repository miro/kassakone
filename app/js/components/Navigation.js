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
                    React.DOM.div( {className:"links"}, 
                        React.DOM.a( {href:"#"}, "Events"),
                        React.DOM.a( {href:"#search"}, "Search"),
                        React.DOM.a( {href:"#logout"}, "Logout")
                    )  
                )
        }
    });
    
    return Navigation;
});
