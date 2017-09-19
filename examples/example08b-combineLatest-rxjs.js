/* global require */

const Rx = require("rx");

const unitsStream = Rx.Observable.interval(1000);
const tensStream = unitsStream.map(x => x * 10);

const sumStream = unitsStream.combineLatest(tensStream, (u, t) => u + t);
sumStream.subscribe(console.log);