/**
 * Created by dariusstrasel on 5/2/17.
 */
var express = require('express');
var app = express();

app.set('port', 3000);

app.get('/', function (req, res) {
    console.log("GET the homepage.");
    res.status(404);
    res.send("Express yourself.");
});

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log("Magic happens on port ", port);
});
