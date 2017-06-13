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
            console.log("Returned " + doc);
            var response = {
                'status': 200,
                'message': doc
            };

            if (!doc) {
            response.status = 404;
            response.message = {
                "message": "Could not find hotel ID " + hotelId
                }
            } else {

                if (err) {
                    response.status = 500;
                    response.message =
                        {"message": "Could not find hotel for review lookup."};
                }

                if (!doc.reviews) {
                    response.status = 200;
                    response.message = {
                        "message": "No reviews found."
                    };
                }
            }

            res
                .status(response.status)
                .json(response.message);
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

        var response = {
            'status': 200,
            'message': hotel
        };

        if (!hotel) {
            response.status = 404;
            response.message = {
                "message": "Could not find hotel ID " + hotelId
                }
            }
            else {

            var review = hotel.reviews.id(reviewId);

            if (!review) {
                response.status = 404;
                response.message = {
                    'message': 'Could not find review with ID ' + reviewId
                    }
            } else {
                response.status = 200;
                response.message = {
                    'message': review
                    };
                }
            }
            res
                .status(response.status)
                .json(response.message);
        });
    };

module.exports = {
    reviewsGetAll: reviewsGetAll,
    reviewsGetOne: reviewsGetOne
};