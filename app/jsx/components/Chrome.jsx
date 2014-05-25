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
    var Chrome = React.createClass({
        render: function() {

            if (credentials.authenticated()) {
                return (
                    <div className="chrome">
                        <Navigation />
                        <Container content={this.props.content} />
                    </div>
                )
            }
            else {
                return <div>
                    <Container content={this.props.content} />
                </div>
            }
            
        }
    });
    
    return Chrome;
});
