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
                app.router.jumpTo('');
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
            //e.preventDefault(); // handles enter key
            var nextState = {};
            nextState[field] = e.target.value;
            this.setState(nextState);
        },


        render: function() {

            return (
                <div className="login-wrap">
                    <div className="logo-wrap center">
                        <img src="/images/kassakone.jpg" />
                        <h1>Kassakone</h1>
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
  




