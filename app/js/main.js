require.config({
	baseUrl: 'js',
    paths: {
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        jquery: '../bower_components/jquery/dist/jquery',
        react: '../bower_components/react/react-with-addons',
        text: '../bower_components/requirejs-text/text',
        moment: '../bower_components/moment/moment',
        'react-backbone': 'react-backbone'
    }
});

// Load main module to start the app
require([
	'underscore',
	'backbone',
	'router',
	'app'
], function(
	_,
	Backbone,
	Router,
	app
) {

	app.router = new Router();
	Backbone.history.start();

	app.navigate = function(route) {
		app.router.jumpTo(route);
	};

	app.vent = _.clone(Backbone.Events)

	console.log("App started");

	return app;
});
