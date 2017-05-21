/**
 * Created by dariusstrasel on 5/2/17.
 */
var express = require('express');
var app = express();

app.set('port', 3000);
var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log("Magic happens on port ", port);
});
