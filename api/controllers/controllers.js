/**
 * Created by dariusstrasel on 5/21/17.
 */
// var dbConnection = require('../data/dbConnection.js');
// var ObjectId = require('mongodb').ObjectID;
// var jsonData = require('../data/hotel-data.json');

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function (req, res) {

    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    // a geoJSON point
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistanceL: 2000,
        num: 5
    };

    Hotel
        .geoNear(point, geoOptions, function (err, results, stats) {
            console.log('Geo results', results);
            console.log('Geo stats', stats);
            res
                .status(200)
                .json(results);
        });
};


var getAllData = function (req, res) {
    console.log("GET the json.");
    console.log(req.query);
    var offset = 0;
    var count = 5;

    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
            console.log("Found hotels", hotels.length);
            res
                .json(hotels);
        });
};

var getOneData = function (req, res) {

    var hotelId = req.params.hotelId;
    console.log("GET hotelID", hotelId);
    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            res.status(200)
                .json(doc);
        });
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