/* global require */

const Rx = require("rx");

const source = Rx.Observable.interval(1000);

source.subscribe(e => console.log("Subscriber 1: " + e));
setTimeout(() => {
    source.subscribe(e => console.log("Subscriber 2: " + e))
}, 3000);
