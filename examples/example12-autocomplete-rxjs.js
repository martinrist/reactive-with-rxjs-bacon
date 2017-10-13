/*global Rx, document*/

// Initialise everything when the page is loaded
Rx.DOM.ready().subscribe(init);


function init() {

    // The input field and results div
    const input = document.getElementById("textInput");
    const resultsDiv = document.getElementById("results");

    // Get all distinct key up events from the input and only
    // fire if long enough and distinct
    const keyup = Rx.Observable
        .fromEvent(input, "keyup")
        .map(e => e.target.value)               // Project the text from the input
        .filter(text => text.length > 2)        // Only if the text is longer than 2 characters
        .debounce(750 /* Pause for 750ms */)
        .distinctUntilChanged();                // Only if the value has changed

    // Clear existing results
    keyup.subscribe(() => resultsDiv.innerHTML = "");

    // Dispatch a search to Wikipedia and create a stream
    // of the response data
    const searchResultsStream = keyup.flatMapLatest(searchWikipedia)
        .pluck("response");

    searchResultsStream.subscribe(
        (results) => {
            if (results[1].length === 0) {
                resultsDiv.innerHTML = "No results found";
            }
        },
        (err) => {
            console.log("Error calling search", err);
            resultsDiv.innerHTML = "An error occurred";
        }
    );

    /* Example response data:
        [
            "Reactive",
            [
                "Reactive",
                "Reactive oxygen species",
                "Reactive attachment disorder",
                ...
            ],
            [
                "Reactive may refer to:",
                "Reactive oxygen species (ROS) are chemically reactive ...",
                ...
            ],
            [
                "https://en.wikipedia.org/wiki/Reactive",
                "https://en.wikipedia.org/wiki/Reactive_oxygen_species",
                "Reactive attachment disorder (RAD) is described in clinical ...",
                ...
            ]
        ]
    */

    // Extract the title from each result
    const searchResultTitles = searchResultsStream
        .flatMap(results => Rx.Observable.from(results[1]));

    // Extract the link from each result
    const searchResultLinks = searchResultsStream
        .flatMap(results => Rx.Observable.from(results[3]));

    // Zip them together to form an object to create the link
    const searchResultEntries = searchResultTitles.zip(
        searchResultLinks,
        (t, l) => {
            return {title: t, link: l};
        });

    // Do the DOM manipulation in the 'subscribe' method
    searchResultEntries.subscribe(entry => {
        console.log("Got entry:", entry);
        const listItem = document.createElement("li");
        listItem.appendChild(renderEntry(entry));
        resultsDiv.appendChild(listItem);
    });

}



// Search Wikipedia for a given term
// Returns an Observable which contains the response
function searchWikipedia(term) {
    console.log("Searching for:  " + term);
    return Rx.DOM.jsonpRequest({
        url: "http://en.wikipedia.org/w/api.php?action=opensearch&callback=wikiSearchCallback&search=" + term,
        jsonpCallback: "wikiSearchCallback"
    }).retry(3);
}


// Renders a result entry as an anchor tag with text and link
function renderEntry(entry) {
    const anchor = document.createElement("a");
    anchor.innerHTML = entry["title"];
    anchor.setAttribute("href", entry["link"]);
    return anchor;
}