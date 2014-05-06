require.config({
    paths: {
        underscore: 'bower_components/underscore/underscore',
        backbone: 'bower_components/backbone/backbone',
        jquery: 'bower_components/jquery/dist/jquery',
        react: 'bower_components/react/react-with-addons',
        text: 'bower_components/requirejs-text/text'
    }
});

// Load main module to start the app
require(['js/app']);
