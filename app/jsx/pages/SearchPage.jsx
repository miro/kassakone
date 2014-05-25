/** @jsx React.DOM */

define([
    'react',
    'credentials'
], function(
    React,
    credentials
) {
    var SearchPage = React.createClass({
        handleChange: function(field, event) {
            event.preventDefault();
            var nextState = {};
            nextState[field] = event.target.value;

            // quick fix to clear the notification area when a field is modified after error 
            nextState.notificationText = "";

            this.setState(nextState);
        },

        render: function() {
            return <div className="search-page">
                    <input
                        name="reservationcode" 
                        className="input" 
                        placeholder="Enter Reservation Code" 
                        onChange={this.handleChange.bind(this, 'reservationcode')} />

                    <button id="search" className="full">Search</button>
                </div>
        }
    });
    
    return SearchPage;
});
