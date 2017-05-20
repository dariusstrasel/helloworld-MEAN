/**
 * Created by dariusstrasel on 5/2/17.
 */
var talk = require('./talk');

console.log("1. Start app");
talk.intro();

var holdOn = setTimeout(function () {
    console.log("2. In the setTimeout().");
}, 1000);

talk.goodbye("World");
talk.hello("Person");

console.log("3. End app.");