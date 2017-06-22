/**
 * Created by dariusstrasel on 5/21/17.
 */
var mongoose = require('mongoose');
var dbURL = 'mongodb://localhost:27017/meanNasdaq';

mongoose.connect(dbURL);

// Mongoose Event Listeners
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to:', dbURL);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected to:', dbURL);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection  error:', err);
});

// Linux/Unix File System Events

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination. (SIGINT)");
        process.exit(0);
    });
});

process.on('SIGTERM', function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination. (SIGTERM)");
        process.exit(0);
    });
});

process.once('SIGUSR2', function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected through app termination. (SIGUSR2)");
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Schemas and models
require('./model.js');
require('./users.model');