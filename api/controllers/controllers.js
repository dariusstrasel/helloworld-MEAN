/**
 * Created by dariusstrasel on 5/21/17.
 */
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

    var returnData = jsonData.slice(offset, offset + count);

    res.status(200);
    res.json(returnData);
};

var getOneData = function (req, res) {
    var dataId = req.params.dataId;
    var thisData = jsonData[dataId];
    console.log("GET the dataId", dataId);
    res.status(200);
    res.json(thisData);
};

var addOneData = function (req, res) {
    console.log("POST the data.");
    console.log(req.body);
    res.status(200);
    res.json(req.body);
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