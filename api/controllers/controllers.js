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
            response = {
                'status': 200,
                'message': results
            };
            if (err) {
                response.status = 500;
                response.message = {
                    "message": "Failed to calculate geospatial query."
                }
            } else {
                console.log('Geo results', results);
                console.log('Geo stats', stats);
                res
                    .status(response.status)
                    .json(response.message);
            }
        });
};


var getAllData = function (req, res) {
    console.log("GET the json.");
    console.log(req.query);
    var offset = 0;
    var count = 5;
    var maxCount = 10;

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

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message": "If supplied in querystring count and offset should be numbers."
            });
        return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Count limit of " + maxCount + " exceeded."
            });
        return;
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
            var response = {
                status: 200,
                message: hotels
            };
            if (err){
                console.log("Error finding hotels");
                response.status = 500;
                response.message = err;
            } else if (!hotels) {
                response.message = {
                    "message": "No hotels found."
                };
            }
                console.log("Found hotels", hotels.length);
            res
                .status(response.status)
                .json(response.message);

        });
};

var getOneData = function (req, res) {

    var hotelId = req.params.hotelId;
    console.log("GET hotelID", hotelId);
    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
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