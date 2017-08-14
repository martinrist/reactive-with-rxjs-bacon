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

- Central abstraction is a 'stream of events'

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


---

# What We'll Look at Today

- bacon.js
    - Simpler

- RxJS
    - Implementation of Reactive Extensions for JavaScript

- Discussion of basic features and comparison between the frameworks

---

# Code Example

* Some Java:

    ```java
    public static void main(String[] args) {
        System.out.println("Hello World")
    }
    ```

* Some Haskell:

    ```haskell
    main :: IO ()
    main = putStrLn "Hello World"
    ```

* Some JavaScript:

    ```javascript
    setTimeout(() => alert("Hello World"), 5000);
    ```


---

# Example with Links

* Text 1
* Text 2
* Text 3
* <a href="examples/debounce.html" target="_blank">Debounce example (new window)</a>

---

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