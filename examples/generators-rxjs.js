/* global require */

const Rx = require("rx");

function* fibonacci(){
    let fn1 = 1;
    let fn2 = 1;
    while (1) {
        var current = fn2;
        fn2 = fn1;
        fn1 = fn1 + current;
        yield current;
    }
}

Rx.Observable.from(fibonacci())
    .take(10)
    .subscribe(function (x) {
        console.log('Value: %s', x);
    });