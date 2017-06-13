/**
 * Created by dariusstrasel on 5/21/17.
 */
var mongoose = require('mongoose');

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
    currency: String
});

// Model export to database
mongoose.model('Hotel', dataSchema, 'hotels');