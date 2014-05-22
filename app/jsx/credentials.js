
define([
    'underscore',
    'jquery',
    'app'
], function (
    _,
    $,
    app
) {

    var credentials = {

        _set: function (username, token) {
            localStorage["username"] = username;
            localStorage["token"] = token;
        },

        _unset: function () {
            localStorage.removeItem('username');
            localStorage.removeItem('token');
        },

        get: function() {
            return {
                username: localStorage["username"],
                token: localStorage["token"]
            };
        },

        authenticated: function () {
            return (localStorage["username"] !== undefined && localStorage["token"] !== undefined);
        },

        loginAsync: function (username, password) {
            var credentials = this;
            username = username || localStorage["username"];

            return $.ajax({
                url: 'http://riot.azurewebsites.net/Token',
                type: "POST",
                datatype : "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: JSON.stringify({ 
                    user: username,
                    password: password,
                    grant_type: password
                })
            }).then(function() {
                // Authentication was successful -> save login credentials to local storage
                credentials._set(username, token);
            });
        },

        logout: function () {
            this._unset();
        }
    };

    return credentials;

});
