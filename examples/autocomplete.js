/*global Rx, document*/

// Search Wikipedia for a given term
function searchWikipedia(term) {
    console.log("Searching for:  " + term);
    return Rx.DOM.jsonpRequest({
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&callback=wikiSearchCallback&search=" + term,
        jsonpCallback: "wikiSearchCallback"
    });
}

function createEntryLink(result) {
    const anchor = document.createElement("a");
    anchor.innerHTML = result["title"];
    anchor.setAttribute("href", result["link"]);
    return anchor;
}

function init() {

    const input = document.getElementById("textInput");
    const results = document.getElementById("results");

    // Get all distinct key up events from the input and only fire if long enough and distinct
    const keyup = Rx.Observable
        .fromEvent(input, "keyup")
        .map(e => e.target.value)               // Project the text from the input
        .filter(text => text.length > 2)        // Only if the text is longer than 2 characters
        .debounce(750 /* Pause for 750ms */)
        .distinctUntilChanged(); // Only if the value has changed

    const searchResultsStream = keyup.flatMapLatest(searchWikipedia)
        .pluck("response");

    // Clear the results when we get a new response
    searchResultsStream.subscribe(() => {
        results.innerHTML = "";
    });

    const searchResultTitles = searchResultsStream
        .flatMap(r => Rx.Observable.from(r[1]));

    const searchResultLinks = searchResultsStream
        .flatMap(r => Rx.Observable.from(r[3]));

    const searchResults = searchResultTitles.zip(
        searchResultLinks,
        (t, l) => {
            return {title: t, link: l};
        });

    searchResults.subscribe(entry => {
        console.log("Got entry:", entry);
        const listItem = document.createElement("li");
        listItem.appendChild(createEntryLink(entry));
        results.appendChild(listItem);
    });

}

Rx.DOM.ready().subscribe(init);