/* global require */

const Bacon = require("baconjs").Bacon;

const onesStream = Bacon.repeatedly(1000, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const tensStream = onesStream.map(x => x * 10);

const sumStream = onesStream.combine(tensStream, (o, h) => o + h);

sumStream.log();
