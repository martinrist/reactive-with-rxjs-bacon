/* global require */

const Rx = require("rx");

const stream = Rx.Observable.interval(1000);
console.log("Stream created");
stream.subscribe(e => console.log("Subscriber 1: " + e));

setTimeout(() =>
        stream.subscribe(e => console.log("Subscriber 2: " + e))
    , 5000);
