/** @jsx React.DOM */

define([
    'react'
], function(React) {
    var TestComponent = React.createClass({
        render: function() {
            return (
                <p>
                    HELLO YES THIS IS DOG
                </p>
            );
        }
    });
    return TestComponent;
});
