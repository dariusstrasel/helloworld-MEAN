/**
 * Created by dariusstrasel on 5/21/17.
 */
// var dbConnection = require('../data/dbConnection.js');
// var ObjectId = require('mongodb').ObjectID;
// var jsonData = require('../data/hotel-data.json');

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var tickerSymbols = mongoose.model('tickerSymbols');

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

var getAllTickerSymbols = function (req, res) {
    console.log("GET the json.");
    console.log(req.query);
    var offset = 0;
    var count = 5;
    var maxCount = 10;


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

    tickerSymbols
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, symbols) {
            var response = {
                status: 200,
                message: symbols
            };
            if (err){
                console.log("Error finding symbols");
                response.status = 500;
                response.message = err;
            } else if (!symbols) {
                response.message = {
                    "message": "No symbols found."
                };
            }
                console.log("Found symbols", symbols.length);
            res
                .status(response.status)
                .json(response.message);

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

var _splitArray = function(input) {
    var output = null
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

var addOneData = function (req, res) {
    Hotel
        .create({
            name: req.body.name,
            description: req.body.description,
            stars: parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        }, function(err, hotel) {
            if (err) {
                console.log("Error creating hotel.");
                res
                    .status(400)
                    .json(err);
                }
            else {
                console.log("Hotel created", hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        });

};

var updateOne = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);

    Hotel
        .findById(hotelId)
        .select("-reviews -rooms")
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
            if (response.status !== 200) {
                res
                .status(response.status)
                .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.description = req.body.description;
                doc.stars = parseInt(req.body.stars, 10);
                doc.services = _splitArray(req.body.services);
                doc.photos = _splitArray(req.body.photos);
                doc.currency = req.body.currency;
                doc.location = {
                address: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
                };

                doc.save(function (err, hotelUpdated) {
                    if(err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                })
            }

        });
};

var deleteOneData = function (req, res) {
    var hotelId = req.params.hotelId;
    Hotel
        .findByIdAndRemove(hotelId)
        .exec(function (err, hotel) {
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log("Hotel deleted, id: " + hotelId);
                res
                    .status(204)
                    .json();
            }
        });
};

var getFile = function (req, res) {
    console.log("GET the file.");
    res.status(200);
    res.sendFile(path.join(__dirname, 'index.js'));
};

module.exports = {
    getAllTickerSymbols: getAllTickerSymbols,
    getAllData: getAllData,
    getOneData: getOneData,
    addOneData: addOneData,
    updateOne: updateOne,
    deleteOneData: deleteOneData,
    getFile: getFile
};