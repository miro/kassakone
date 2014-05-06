/** @jsx React.DOM */
define([
	'backbone',
    'js/router',
    'text!testdata/mockDB.json'
], function(
	Backbone,
	Router,
	mockDB
) {
    var router = new Router();


    console.log(mockDB);
});
