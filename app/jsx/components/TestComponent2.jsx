/** @jsx React.DOM */

define([
    'react'
], function(React) {
    var TestComponent2 = React.createClass({
        testFunction: function() {
            alert("OLé!");
        },
        
        render: function() {
            return (
                <p onClick={this.testFunction}>
                    NO THIS IS NOT DOG, di sis {this.props.dog.name}
                </p>
            );
        }
    });
    return TestComponent2;
});
