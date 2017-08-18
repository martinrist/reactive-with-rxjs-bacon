/* global require */

const Bacon = require("baconjs").Bacon;
const axios = require("axios");

const responsePromise = axios.get("http://httpbin.org/headers");
const responseStream = Bacon.fromPromise(responsePromise)
    .map(r => r.data.headers);

responseStream.onValue(e => console.log(e));
responseStream.onError(e => console.log("An error occurred: " + e));
