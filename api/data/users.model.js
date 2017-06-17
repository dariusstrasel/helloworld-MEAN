/**
 * Created by dariusstrasel on 6/17/17.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('User', userSchema);