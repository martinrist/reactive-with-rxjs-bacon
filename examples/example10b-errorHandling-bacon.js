/* global require */

const Bacon = require("baconjs").Bacon;

const eventStream = Bacon.fromArray([1, 2, 3])
    .concat(Bacon.once(new Bacon.Error("An error occurred")))
    .concat(Bacon.fromArray([4, 5]));

// The default behaviour outputs 4 and 5
eventStream.log();