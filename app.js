/**
 * Created by dariusstrasel on 5/2/17.
 */
var express = require('express');
var app = express();
var path = require('path');

app.set('port', 3000);

app.get('/', function (req, res) {
    console.log("GET the homepage.");
    res.status(404);
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/json', function (req, res) {
    console.log("GET the JSON.");
    res.status(200);
    res.json( {'jsonData': true} );
});

app.get('/file', function (req, res) {
    console.log("GET the file.");
    res.status(200);
    res.sendFile( path.join(__dirname, 'app.js') );
});

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log("Magic happens on port ", port);
});
