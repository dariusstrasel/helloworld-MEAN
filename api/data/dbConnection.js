/**
 * Created by dariusstrasel on 5/21/17.
 */
var MongoClient = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/meanDatabase';
var _connection = null;

var open = function () {
    MongoClient.connect(dbURL, function (err, db) {
        if (err){
            console.log("Database connection failed:", err);
            return;
        } else {
            _connection = db;
            console.log("Database connection successful:", db)
        }
    });
    //set connection
};

var get = function () {
    return _connection;
};

module.exports = {
    open: open,
    get: get
};
