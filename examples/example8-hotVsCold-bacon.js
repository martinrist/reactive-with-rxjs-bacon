/* global require */

const Bacon = require("baconjs").Bacon;

// A clunkier version of Rx.Observable.interval(1000)
const stream = Bacon.repeat(i => Bacon.later(1000, i));
console.log("Stream created");
stream.onValue(e => console.log("Subscriber 1: " + e));

setTimeout(() =>
    stream.onValue(e => console.log("Subscriber 2: " + e))
    , 5000);
