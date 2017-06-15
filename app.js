/**
 * Created by dariusstrasel on 5/2/17.
 */
var express = require('express');
require('./api/data/db.js');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');

// Define the webserver port
app.set('port', 3000);

// Middleware which prints every incoming request
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'))

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({extended: false}));

// Route defitions
app.use('/api', routes);


app.get('/', function (req, res) {
    console.log("GET the homepage.");
    res.status(200);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Evoke server and listen for requests
var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log("Magic happens on port ", port);
});
