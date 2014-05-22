require.config({
	baseUrl: 'js',
    paths: {
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        jquery: '../bower_components/jquery/dist/jquery',
        react: '../bower_components/react/react-with-addons',
        text: '../bower_components/requirejs-text/text',
        'react-backbone': 'react-backbone'
    }
});

// Load main module to start the app
require([
	'backbone',
	'router',
	'app'
], function(
	Backbone,
	Router,
	app
) {

	app.router = new Router();
	Backbone.history.start();

	console.log("App started");

	return app;
});
