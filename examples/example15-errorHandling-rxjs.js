/* global require */

const Rx = require("rx");

const observable = Rx.Observable
    .from([1, 2, 3])
    .concat(Rx.Observable.throw(new Error("An error occurred")))
    .concat(Rx.Observable.from([4, 5]));

observable.subscribe(
    i   => console.log("Received:", i),
    err => console.log("Error thrown:", err.message),
    ()  => console.log("Completed"));