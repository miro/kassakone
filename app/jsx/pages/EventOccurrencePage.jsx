/** @jsx React.DOM */

define([
    'underscore',
    'react',
    'react-backbone'
], function(
    _,
    React,
    rbbMixin
) {

    var EventOccurrencePage = React.createClass({

        mixins: [rbbMixin],

        updateOnProps: {
            occurrence: 'model',
            reservations: 'collection'
        },

        getInitialState: function() {
            return {};
        },
        
        render: function() {
            var occurrence = this.props.occurrence.toJSON();
            var reservations = this.props.reservations.toJSON();

            return (
                <div className="occurrence">
                    {occurrence}
                    <br />
                    {reservations}
                </div>
            )
        }

    });

    return EventOccurrencePage;
});
