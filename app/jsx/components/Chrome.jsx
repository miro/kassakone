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
            var navigation;

            if (credentials.authenticated()) {
                navigation = <Navigation />;
            }
            
            return (
                <div className="chrome">
                    {navigation}
                    <Container content={this.props.content} />
                    <div className="footer">
                        <p>&copy; Ananassi &amp; Co 2014</p>
                    </div>
                </div>
            )
        }
    });
    
    return Chrome;
});
