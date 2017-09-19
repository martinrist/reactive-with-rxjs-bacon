/* global require */

const Bacon = require("baconjs").Bacon;

// emits and increasing integer every second
const unitsStream = Bacon.repeat(i => Bacon.later(1000, i));
const tensStream = unitsStream.map(x => x * 10);

const sumStream = Bacon.combineWith(unitsStream, tensStream, (u, t) => u + t);
sumStream.log();