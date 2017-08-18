/* global require */

const Rx = require("rx");

// const rangeStream = Rx.Observable.interval(1000);
//
// console.log("Range stream created");
//
// rangeStream.subscribe(e => console.log("First subscriber: " + e));
//
// setTimeout(() => rangeStream.subscribe(e => console.log("Second subscriber: " + e)), 5000);
//

Rx.DOM.from
const unitsStream = Rx.Observable.interval(1000);
const tensStream = unitsStream.map(x => x * 10);

const sumStream = unitsStream.combineLatest(tensStream, (o, t) => o + t);
sumStream.subscribe(console.log);