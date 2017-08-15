class: center, middle

# Reactive Programming with Bacon.js and RxJS


---

# Agenda

1. Introduction
2. Deep-dive
3. ...

---

# What is Reactive Programming?

- Wikipedia : "An asynchronous programming paradigm concerned with data streams and the propagation of change"

- A different way of thinking about asynchronous data, e.g.:
    - Mouse clicks
    - Field updates
    - Server-side data
    - Timer 'ticks'
    - Other page events 

- Designed to be an easier, clearer and more expressive way of handling complex interactions between events

- Another approach to avoiding 'callback hell'

- The central abstraction is a 'stream of events':
    - Events can be of different types and have different sources
    - Reactive Programming abstracts across these different sources so they can be handled in the same way

- Streams can be operated on 'as a whole', rather than individual events, e.g.:
    - merging two streams
    - filtering events out of a stream
    - accruing state (e.g. counters)

- Things can 'subscribe' to streams to be notified and take action
    - Separates event flow and side effects

- Can think of this in terms of dependent things _reacting_ to changes in their dependencies:
    - Rather than the data sources _pushing_ data into their dependents

---

# The Original Reactive System

- The spreadsheet

- Cells declare their dependencies on other cells and react to changes automatically


---

# History

- Much early work done by Erik Meijer whilst at MSFT

- 2012 ACM Paper - 'Your Mouse is a Database'

- 2009 - Reactive Extensions for .NET released
    - Subsequently extended to other languages

- TODO: Add a bit here about Bacon and RxJS

---

# What We'll Look at Today

- Introduce bacon.js and contrast it with trad approaches for simple examples

- Show some of the common operators on streams

- Talk a bit about RxJS
    - Implementation of Reactive Extensions for JavaScript

- Discuss some of the differences between the two

---

# Creating and Subscribing to Event Streams

- Log the x- and y- coordinates of mouse-clicks to the console

- Traditionally, add an event listener (<a href="examples/example1-mouseClick-trad.html" target="_blank">Example</a>):
```javascript
    document.addEventListener("click", console.log);
```

- With Bacon (<a href="examples/example1-mouseClick-bacon.html" target="_blank">Example</a>):
```javascript
    // Create a Bacon EventStream
    const eventStream = Bacon.fromEvent(document, "click");

    // Subscribe to the EventStream
    eventStream.onValue(console.log);
```

- Notice how the two concerns (raising and handling events) are separated

- Also, notice that the event stream is a first-class value


---

# Filtering Event Streams

- As before, but we only want to see the clicks on the right-hand side

- Traditionally, we'd use an `if` statement in the callback:
```javascript
    document.addEventListener("click", e => {
        if (e.clientX > window.innerWidth / 2) {
            console.log(e);
        }
    });
```

- Note that we can no longer use the simple `console.log` reference because of the conditional

- If we needed something else to react to _all_ clicks, we'd need a separate callback

- With Bacon.js we can apply a `filter` to the original stream:
```javascript
    // Create a Bacon EventStream
    const eventStream = Bacon.fromEvent(document, "click");

    // Filter to create a new stream with only the 'right-hand' clicks
    const rhsEventStream = eventStream.filter(
        e => e.clientX > window.innerWidth / 2);

    // Subscribe to the EventStream
    // Note the use of just `log` here
    rhsEventStream.log();
```

- Notice that we can still use `log` because we've separated the filtering from the side-effect

- Notice that filtering doesn't affect the original stream...
    - ...so it can be subscribed to independently

---


# Transforming values in a Stream

- Let's say we want to represent the coordinates in the console - e.g. `(123, 456)`

- Traditionally, it's in the callback again:
```javascript
    const clickToCoords =
        e => "(" + e.clientX + ", " + e.clientY + ")";

    document.addEventListener("click", e =>
        console.log(clickToCoords(e)));
```

- With Bacon, this is just a `map`:
```javascript
    const clickToCoords =
        e => "(" + e.clientX + ", " + e.clientY + ")";

    // Create a Bacon EventStream
    const eventStream = Bacon.fromEvent(document, "click");

    // Convert clicks to coordinates
    const coordStream = eventStream.map(clickToCoords);

    // Subscribe to the EventStream
    coordStream.log();
```

---

# Filtering and Mapping

- Only show the RHS clicks _and_ show them as coordinates.

- Starting to get a bit gnarly with the traditional approach, because it's just not nicely composable:
```javascript
    document.addEventListener("click", e => {
        if (e.clientX > window.innerWidth / 2) {
            console.log(clickToCoords(e));
        }
    });
```

- Here's the Bacon version:
```javascript
    const eventStream = Bacon.fromEvent(document, "click");
    const rhsEventStream = eventStream.filter(
            e => e.clientX > window.innerWidth / 2);
    const rhsCoordStream = rhsEventStream.map(clickToCoords);
    rhsCoordStream.log();
```

- The various operators chain easily, so we _could_ just do:
```javascript
    Bacon.fromEvent(document, "click")
         .filter(e => e.clientX > window.innerWidth / 2)
         .map(clickToCoords)
         .log();
```

---

# Taking a certain number of events from a stream

- Log only the first 5 clicks...
    - ... and make sure you dispose of the listener at the end

- Traditionally, we need to maintain some state:
```javascript
    let clicks = 0;
    document.addEventListener("click", function registerClicks(e) {
        if (clicks < 5) {
            console.log(e);
            clicks += 1;
        } else {
            document.removeEventListener("click", registerClicks);
        }
    });
```

- That `let` should be a _massive_ alarm bell...

- Also, we need to explicitly deregister the event listener to avoid leaks

- Bacon.js has the `take` operator, to take values then end the stream:
```javascript
    const eventStream = Bacon.fromEvent(document, "click");
    eventStream.take(5).log();
```

- Again, this composes nicely with the other operators, unlike the traditional approach

---

# Where are we?

- Streams:
    - Are potentially infinite
    - Can be transformed using operators like `filter`, `map` etc
    - Are immutable
    - Have operations to avoid the need to manage state

- Sound familiar?

- This is often why this stuff is referred to as 'Functional Reactive Programming` (FRP)...

- ... although that's technically different, and *definitely* a story for another time

---

# Creating Streams from...

- Remember the bit about Streams being a unifying abstraction across various things?

- What sort of things can you create an EventStream from?

- `range`, `interval`,

---

# More complex operators

- `flatMap` for an Ajax request

- See https://rxviz.com/

# RxJS / Bacon - Comparison Points

* Multi-langauge bindings (Rx) vs single-language (Bacon)
--

* Hot vs Cold Observables (RxJS only)
--

* EventStream vs Property (Bacon only)
--

* Performance tradeoffs (Bacon slower for glitch-free performance)
--

* Glitch-free / atomic updates (Bacon properties)
--

* Lazy evaluation (Bacon)
--

* Error handling - Errors terminate stream (RxJS) vs multiple errors (Bacon)
--

* Packaging - different subsets / cut-down versions (RxJS)
--

* Testing using Schedulers (RxJS) - can you do similar with Bacon?

---

# Other Discussion Points

* Why they're not officially *F*RP (continuous time)
* Bacon's origin from RxJS (originally not open source)
* Bacon - CoffeeScript?

---

# Links

* [Why Bacon?](https://github.com/baconjs/bacon.js#why-bacon)
* [BaconJS for RxJS Users](https://baconjs.github.io/api.html#for-rxjs-users)
* [RxJS for Bacon.js Users](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/mapping/bacon.js/whyrx.md)
* ['Reactive JavaScript Programming' video](https://www.safaribooksonline.com/library/view/reactive-javascript-programming/9781787284913/)
* [RxJS 4.0 Book](https://xgrommx.github.io/rx-book)