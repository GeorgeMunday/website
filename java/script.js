let currentIndex = 0;  // Track the current highlight index
let matches = []; // Store the highlighted elements

function searchText() {
    // Get the search term input
    var searchterm = document.getElementById("searchInput").value.trim().toLowerCase();

    // If the search term is empty, stop the function
    if (searchterm === "") {
        alert("Please enter a search term.");
        return false;
    }

    // Remove previous highlights
    var highlighted = document.querySelectorAll('.highlight');
    highlighted.forEach(function(element) {
        element.classList.remove('highlight');
    });

    // Reset the matches array
    matches = [];
    currentIndex = 0;

    // Search for the term in the body of the document
    var contextText = document.body.innerHTML.toLowerCase();
    var regex = new RegExp('(' + searchterm + ')', 'gi');

    // Find and store matches
    document.body.innerHTML = document.body.innerHTML.replace(regex, function(match) {
        let span = document.createElement('span');
        span.innerHTML = match;
        span.classList.add('highlight');
        matches.push(span);

        return span.outerHTML;
    });

    // If no results are found, alert the user
    if (matches.length === 0) {
        alert("No matches found.");
    } else {
        // If there are matches, highlight the first one
        highlightMatch();
    }

    return false; // Prevent form submission
}

function highlightMatch() {
    if (matches.length > 0) {
        // Clear previous highlight
        document.querySelectorAll('.highlight').forEach(el => el.classList.remove('current-highlight'));

        // Highlight the current match
        matches[currentIndex].classList.add('current-highlight');
    }
}

function nextMatch() {
    if (matches.length > 0) {
        // Move to the next match
        currentIndex = (currentIndex + 1) % matches.length;
        highlightMatch();
    }
}

function prevMatch() {
    if (matches.length > 0) {
        // Move to the previous match
        currentIndex = (currentIndex - 1 + matches.length) % matches.length;
        highlightMatch();
    }
}
