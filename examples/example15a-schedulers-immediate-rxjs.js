/* global require */

const Rx = require("rx");

console.log("Before subscription");

Rx.Observable.range(1, 3)
    .do(i => console.log("Processing value", i))
    .observeOn(Rx.Scheduler.immediate)
    .subscribe(i => console.log("Emitted", i));

console.log("After subscription");