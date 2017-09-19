/* global require */

const Rx = require("rx");

const values = Rx.Observable.from(["red", "green", "blue", "purple", "pink"]);
const ticks = Rx.Observable.interval(1000);

const valuesAtInterval = values.zip(ticks, (c, i) => c);

valuesAtInterval.subscribe(console.log);