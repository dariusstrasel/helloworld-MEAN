/**
 * Created by dariusstrasel on 5/21/17.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var reviewSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var roomSchema = new mongoose.Schema({
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: Number
});

var dataSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    services: [String],
    description: String,
    photos: [String],
    currency: String,
    reviews: [reviewSchema],
    rooms: [roomSchema],
    location: {
        address: String,
        // Always store coordinates longitude (E/W), latitude (N/S)
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});

var tickerSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastSale: {
        type: mongoose.SchemaTypes.Double
    },
    marketCap:{
        type: String
    },
    ipoYear: {
        type: Number
    },
    sector: {
        type: String
    },
    industry: {
        type: String
    }

});

// Model export to database
mongoose.model('tickerSymbols', tickerSchema, 'tickerSymbols');
mongoose.model('Hotel', dataSchema, 'hotels');