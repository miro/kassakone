#!/usr/bin/env node

/**
	A tiny mock server for developing the Kassakone frontend.
	
	Start server:
		./server.js
		node server.js
*/

var express = require('express');
var app = express();
var logger = require('morgan');

// Logs HTTP requests to console
app.use(logger("tiny"));

// Configure static file hosting middleware
app.use(express.static(__dirname + '/app'));

// Configure HTTP routes for the mock API 
app.get('/api', function(req, res) {
	res.send("ok");
});

// Launch server
var port = 3000;
var server = app.listen(port, function() {
	console.log("Server running :: http://localhost:" + port);
});
