/* global require */

const Rx = require("rx");

const source = Rx.Observable.interval(1000);
const subject = new Rx.Subject();
source.subscribe(subject);

subject.subscribe(e => console.log);