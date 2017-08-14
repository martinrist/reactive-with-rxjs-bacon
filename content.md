class: center, middle

# Title

---

# Agenda

1. Introduction
2. Deep-dive
3. ...

---

# Introduction

* Bullet 1
* Bullet 2

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