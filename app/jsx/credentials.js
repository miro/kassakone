
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

        _initialize: function () {
            var credentials = this;
            // // Set username and token as a part of every ajax request
            // $.ajaxPrefilter( function( options ) {
            //     if (config.endpoint.urlRequiresCredentials(options.url) && credentials.authenticated()) {
            //         var credentialsString =
            //             'username=' + (localStorage["username"] || '') +
            //             '&token=' + (localStorage["token"] || '');
            //         if (options.url.indexOf('?') === -1) {
            //             options.url += '?' + credentialsString;
            //         } else {
            //             options.url += '&' + credentialsString;
            //         }
            //     }
            // });

        },

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
                url: 'http://riot.azurewebsites.net/api/Token',
                type: "POST",
                datatype : "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: "username=" + username + "&password=" + password + "&grant_type=password"
            }).then(function(response) {
                // Authentication was successful -> save login credentials to local storage
                credentials._set(response.userName, response.access_token);
            });
        },

        logout: function () {
            this._unset();
        }
    };

    credentials._initialize();
    //return _.bindAll(credentials);
    return credentials;

});
