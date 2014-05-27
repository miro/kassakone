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
    var Login = React.createClass({displayName: 'Login',
        getInitialState: function getInitialState() {
            return {
                notificationText: "",
                username: "",
                password: ""
            }
        },

        handleLogin: function(event) {
            event.preventDefault();

            var username = this.state.username;
            var password = this.state.password;
            
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
                .loginAsync(username, password)
                .then(onSuccess.bind(this))
                .fail(onFailure.bind(this));
        },

        handleChange: function(field, event) {
            event.preventDefault();
            var nextState = {};
            nextState[field] = event.target.value;

            // quick fix to clear the notification area when a field is modified after error 
            nextState.notificationText = "";

            this.setState(nextState);
        },

        render: function() {
            var showNotificationArea = this.state.notificationText ? 'show' : '';
            var notificationAreaClasses = "notification-area " + showNotificationArea;

            return (
                React.DOM.div( {className:"login-wrap"}, 
                    React.DOM.div( {className:"logo-wrap center"}, 
                        React.DOM.img( {src:"/images/kassakone.jpg"} ),
                        React.DOM.h1(null, "Kassakone")
                    ),
                    
                    React.DOM.div( {className:notificationAreaClasses}, 
                        React.DOM.span( {className:"notification-text"}, this.state.notificationText)
                    ),

                    React.DOM.form( {onSubmit:this.handleLogin}, 
                        React.DOM.input(
                            {name:"username", 
                            className:"input", 
                            placeholder:"Username", 
                            onChange:this.handleChange.bind(this, 'username')} ),

                        React.DOM.input( 
                            {name:"password", 
                            className:"input", 
                            placeholder:"Password", 
                            onChange:this.handleChange.bind(this, 'password'), 
                            type:"password"} ),
                        
                        React.DOM.button( {className:"button"}, "Log in")
                    )
                )
            );
        }
    });
    return Login;
});
  




