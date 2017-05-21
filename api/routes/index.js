/**
 * Created by dariusstrasel on 5/20/17.
 */
var express = require('express');
var path = require('path');
var controllers = require('../controllers/controllers.js');
var router = express.Router();


router.route('/json')
    .get(controllers.getAllData);

router.route('/file')
    .get(controllers.getFile);

module.exports = router;