/**
 * Created by dariusstrasel on 5/21/17.
 */
var dbConnection = require('../data/dbConnection.js');
var ObjectId = require('mongodb').ObjectID;
var jsonData = require('../data/hotel-data.json');

var getAllData = function (req, res) {
    console.log("GET the json.");
    console.log(req.query);

    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    var db = dbConnection.get();
    var collection = db.collection('hotels');
    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function (err, data) {
        if (err){
            console.log("Error:", err);
        } else {
            console.log("Found: ", data);
            res.status(200).json(data);
        }
    });
};

var getOneData = function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('hotels');

    var dataId = req.params.dataId;
    collection
        .findOne({
            _id: ObjectId(dataId)
        }, function (err, data) {
            if (err){
                console.log("Error:", err);
            } else {
                console.log("GET the dataId", dataId);
                res.status(200);
                res.json( data );
            }
        })
};

var addOneData = function (req, res) {
    var db = dbConnection.get();
    var collection = db.collection('hotels');
    var newData;

    if (req.body && req.body.name && req.body.stars) {
        console.log("POST the data.");
        newData = req.body;
        newData.stars = parseInt(req.body.stars, 10);
        console.log(newData);
        collection.insertOne(newData, function (err, response) {
            if (err) {
                console.log("Error:", err);
            } else {
                console.log(response.ops);
                res.status(201);
                res.json(response.ops);
            }
        })
    } else {
        errorMessage = 'Data missing from body.';
        console.log(errorMessage);
        res.status(400);
        res.json( { message: errorMessage } );
    }


};

var getFile = function (req, res) {
    console.log("GET the file.");
    res.status(200);
    res.sendFile(path.join(__dirname, 'index.js'));
};

module.exports = {
    getAllData: getAllData,
    getOneData: getOneData,
    addOneData: addOneData,
    getFile: getFile
};