/**
 * Created by dariusstrasel on 5/20/17.
 */
var express = require('express');
var path = require('path');
var controllers = require('../controllers/controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers');
var ctrlUsers = require('../controllers/users.controllers');
var router = express.Router();

// tickerSymbol routes
router.route('/tickersymbols')
    .get(controllers.getAllTickerSymbols);


// Hotel routes
router.route('/hotels')
    .get(controllers.getAllData)
    .post(controllers.addOneData);

// Parameterized route url
router.route('/hotels/:hotelId')
    .get(controllers.getOneData)
    .put(controllers.updateOne)
    .delete(controllers.deleteOneData);

router.route('/hotels/new')
    .post(controllers.addOneData);


// Review routes

router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);

router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

// Misc route
router.route('/file')
    .get(controllers.getFile);

// Authentication routes
router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;