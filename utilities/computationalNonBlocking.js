/**
 * Created by dariusstrasel on 5/20/17.
 */
var childProcess = require('child_process');
var fib = require('./_fibonacci');

console.log(1);

var newProcess = childProcess.spawn('node', ['_fibonacci.js'], {
    stdio: 'inherit'
});

// console.log(fib.fibonacci(42));
console.log(2);