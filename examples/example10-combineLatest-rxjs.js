/* global require */

const Rx = require("rx");

const unitsStream = Rx.Observable.interval(1000);
const tensStream = unitsStream.map(x => x * 10);

const sumStream = unitsStream.combineLatest(tensStream, (o, t) => o + t);
sumStream.subscribe(console.log);