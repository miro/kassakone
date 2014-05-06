/** @jsx React.DOM */

define([
    'react',
    'components/Navigation',
    'components/Container'
], function(
    React,
    Navigation,
    Container
) {
    var Chrome = React.createClass({
        render: function() {
            return (
                <div>
                    <Navigation />
                    <Container content={this.props.content} />
                </div>
            );
        }
    });
    
    return Chrome;
});
