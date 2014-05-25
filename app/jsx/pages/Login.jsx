/** @jsx React.DOM */

define([
    'react',
    'app',
    'credentials'
], function(
    React,
    app,
    credentials
) {

    // http://clozeit.wordpress.com/2014/01/13/bootstrap-forms-using-react-js/
    var Login = React.createClass({
        getInitialState: function getInitialState() {
            return {
                notificationText: null
            }
        },

        handleLogin: function(event) {
            function onSuccess() {
                console.log("Login OK!");
                app.router.jumpTo('');
            }

            function onFailure(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 0) {
                    this.setState({
                        notificationText: "API is down. Try again later."
                    });
                } else {
                    this.setState({
                        notificationText: "Wrong username or password."
                    });
                }
            }

            credentials
                .loginAsync(this.state.user, this.state.password)
                .then(onSuccess.bind(this))
                .fail(onFailure.bind(this));
        },

        handleChange: function(field, e) {
            //e.preventDefault(); // handles enter key
            var nextState = {};
            nextState[field] = e.target.value;
            this.setState(nextState);
        },


        render: function() {
            var showNotificationArea = this.state.notificationText ? 'show' : '';
            var notificationAreaClasses = "notification-area " + showNotificationArea;

            return (
                <div className="login-wrap">
                    <div className="logo-wrap center">
                        <img src="/images/kassakone.jpg" />
                        <h1>Kassakone</h1>
                    </div>
                    <div className={notificationAreaClasses}>
                        <span className="notification-text">{this.state.notificationText}</span>
                    </div>
                    <form onSubmit={this.handleLogin}>
                        <input className="input" placeholder="Username" onChange={this.handleChange.bind(this, 'user')} />
                        <input className="input" type="password" placeholder="Password" onChange={this.handleChange.bind(this, 'password')}/>
                        <button className="button">Log in</button>
                    </form>
                </div>
            );
        }
    });
    return Login;
});
  




