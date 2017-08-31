/* global require */

const Rx = require("rx");

const onNext = Rx.ReactiveTest.onNext;

testrunner.test("Test value order",
    assert => {
        const scheduler = new Rx.TestScheduler();
        const subject = scheduler.createColdObservable(
            onNext(100, "first"),
            onNext(200, "second"),
            onNext(300, "third")
        );

        let result = '';
        subject.subscribe(value => result = value);

        scheduler.advanceBy(100);
        assert.equal(result, "first");

        scheduler.advanceBy(100);
        assert.equal(result, "second");

        scheduler.advanceBy(100);
        assert.equal(result, "first");
    });