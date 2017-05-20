/**
 * Created by dariusstrasel on 5/20/17.
 */

var goodbyeWorld = function (name) {
    console.log("Goodbye", name)
};

var helloWorld = function (name) {
    console.log("Hello", name)
};

var intro = function () {
  console.log("Hello, Im a node file called 'index.js'.")
};

module.exports = {
    hello: helloWorld,
    goodbye: goodbyeWorld,
    intro: intro
};