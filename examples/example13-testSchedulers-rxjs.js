/* global require */

const Rx = require("rx");

const scheduler = new Rx.TestScheduler();
const testObject = Rx.Observable.interval(1000, scheduler);

testObject.subscribe(console.log);

advanceTime(1000);
advanceTime(500);
advanceTime(500);
advanceTime(999);
advanceTime(1);

function advanceTime(ms) {
    console.log("Advancing time by", ms, "ms");
    scheduler.advanceBy(ms);
}