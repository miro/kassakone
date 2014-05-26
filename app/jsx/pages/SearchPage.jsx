/** @jsx React.DOM */

define([
    'react',
    'app',
    'credentials',
    'models/Reservation'
], function(
    React,
    app,
    credentials,
    ReservationModel
) {
    var SearchPage = React.createClass({
        getInitialState: function() {
            return {reservationCode: undefined}
        },

        handleChange: function(field, event) {
            event.preventDefault();
            var nextState = {};
            nextState[field] = event.target.value;

            // quick fix to clear the notification area when a field is modified after error 
            nextState.notificationText = "";

            this.setState(nextState);

        },

        handleSearch: function() {
            if (_.isUndefined(this.state.reservationCode)) {
                return; // input field is null
            }
            var self = this;

            var reservationModel = new ReservationModel({id: this.state.reservationCode});
            self.setState({ notificationText: "Searching..." });
            reservationModel.fetch({
                success: function(model, response, options) {
                    app.router.jumpToReservation(model);
                },
                error: function(model, response, options) {
                    self.setState({
                        notificationText: "Reservation not found"
                    });
                }
            });

        },

        render: function() {
            var notificationClassName = "notification-area";
            notificationClassName += this.state.notificationText ? " show" : " hide";

            return <div className="search-page">
                    <input
                        name="reservationCode" 
                        className="input" 
                        placeholder="Enter Reservation Code" 
                        onChange={this.handleChange.bind(this, 'reservationCode')} />

                    <button id="search" className="full" onClick={this.handleSearch}>
                        Search
                    </button>

                    <div className={notificationClassName}>
                        <span className="notification-text">{this.state.notificationText}</span>
                    </div>
                </div>
        }
    });
    
    return SearchPage;
});
