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
        
        handleLogin: function(event) {
            credentials.loginAsync(this.state.user, this.state.password)
            .then(function() {
                console.log("Login OK!");
                app.navigate('listing');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 0) {
                    alert("API is down");
                } else {
                    alert("Wrong User/PW");
                }
            });
        },

        handleChange: function(field, e) {
            var nextState = {};
            nextState[field] = e.target.value;
            this.setState(nextState);
        },


        render: function() {

            return (
                <div className={"login-wrap"}>
                    <h3>Login</h3>

                    <input id="user" type="text" placeholder="Username" onChange={this.handleChange.bind(this, 'user')} />
                    <input id="password" placeholder="Password" type="password" onChange={this.handleChange.bind(this, 'password')}/>

                    <button onClick={this.handleLogin} type="#">Login</button>
                </div>
            );
        }
    });
    return Login;
});
  




