/** @jsx React.DOM */

define([
    'react',
    'components/Navigation',
    'components/Container',
    'credentials'
], function(
    React,
    Navigation,
    Container,
    credentials
) {
    var Chrome = React.createClass({displayName: 'Chrome',
        render: function() {
            var navigation;

            if (credentials.authenticated()) {
                navigation = Navigation(null );
            }
            
            return (
                React.DOM.div( {className:"chrome"}, 
                    navigation,
                    Container( {content:this.props.content} ),
                    React.DOM.div( {className:"footer"}, 
                        React.DOM.p(null, "© Ananassi & Co 2014")
                    )
                )
            )
        }
    });
    
    return Chrome;
});
