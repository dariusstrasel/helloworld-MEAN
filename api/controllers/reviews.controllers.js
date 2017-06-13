/**
 * Created by dariusstrasel on 6/12/17.
 */
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// GET all reviews for a hotel
var reviewsGetAll = function (req, res) {

    var hotelId = req.params.hotelId;
    console.log("GET hotelID", hotelId);
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function (err, doc) {
            res
                .status(200)
                .json(doc.reviews);
        });
};

// GET single review for a hotel
var reviewsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function (err, hotel) {
        console.log("Returned hotel", hotel);
        var review = hotel.reviews.id(reviewId);
        res
            .status(200)
            .json(review);
    });
};

module.exports = {
    reviewsGetAll: reviewsGetAll,
    reviewsGetOne: reviewsGetOne
};