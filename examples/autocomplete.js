/*global Rx*/

// Search Wikipedia for a given term
function searchWikipedia(term) {
    return Rx.DOM.jsonpRequest({
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiSearchCallback&search=" + term,
        jsonpCallback: "wikiSearchCallback"
    });
}

function init() {

    const input = document.getElementById("textInput");
    const results = document.getElementById("results");

    // Get all distinct key up events from the input and only fire if long enough and distinct
    const keyup = Rx.Observable
        .fromEvent(input, 'keyup')
        .map(e => e.target.value)               // Project the text from the input
        .filter(text => text.length > 2)        // Only if the text is longer than 2 characters
        .debounce(750 /* Pause for 750ms */)
        .distinctUntilChanged(); // Only if the value has changed

    keyup.subscribe(console.log);
    const searcher = keyup.flatMapLatest(searchWikipedia)
        .pluck("response")
        .map(r => r[1]);

    searcher.subscribe(console.log);
}

Rx.DOM.ready().subscribe(init);