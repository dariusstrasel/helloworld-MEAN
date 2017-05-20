/**
 * Created by dariusstrasel on 5/20/17.
 */

var recursive = function (n) {
    if(n <= 2) {
        return 1;
    } else {
        return recursive(n - 1) + recursive(n - 2);
    }
};

console.log("default fib:", recursive(3));

module.exports = {
    fibonacci: recursive
};
