/**
 * Created by dariusstrasel on 5/20/17.
 */
var express = require('express');
var path = require('path');
var router = express.Router();


router.route('/json')
    .get(function (req, res) {
        console.log("GET the json.");
        res.status(200);
        res.json({'jsonData':true});
    })
    .post(function (req, res) {
        console.log("POST the json route.");
        res.status(200);
        res.json({'jsonData': 'POST received.'})
    });

router.route('/file')
    .get(function (req, res) {
        console.log("GET the file.");
        res.status(200);
        res.sendFile( path.join(__dirname, 'index.js') );
    });

module.exports = router;