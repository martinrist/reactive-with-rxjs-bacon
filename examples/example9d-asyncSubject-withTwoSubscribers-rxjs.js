/* global require */

const Rx = require("rx");

// Emits "red", "green", "blue" at 1s intervals
const source = Rx.Observable.from(["red", "green", "blue"])
    .zip(Rx.Observable.interval(1000), (c, i) => c);
const subject = new Rx.AsyncSubject();
source.subscribe(subject);

subject.subscribe(e => console.log("Subscriber 1: " + e));
setTimeout(() => {
    subject.subscribe(e => console.log("Subscriber 2: " + e))
}, 5000);
