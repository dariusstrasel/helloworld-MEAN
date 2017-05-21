/**
 * Created by dariusstrasel on 5/21/17.
 */
var jsonData = require('../data/hotel-data.json');

var getAllData = function (req, res) {
    console.log("GET the json.");
    res.status(200);
    res.json(jsonData);
};

var getFile = function (req, res) {
    console.log("GET the file.");
    res.status(200);
    res.sendFile(path.join(__dirname, 'index.js'));
};

module.exports = {
    getAllData: getAllData,
    getFile: getFile
};