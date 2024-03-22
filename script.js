
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-button');
const newBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// Loading func
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Get new quote
function newQuote() {
    loading();
    // pick random quote
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    console.log(quote.text);
// unknow author
    if (!quote.author) {
        authorText.textContent = '-----';
    } else {
        authorText.textContent =quote.author;
    }
    // long quote
    if (quote.text.length > 180) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove('long-quote');
    }
    // hide Loader
    complete();
    quoteText.textContent =quote.text;

}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        // Cath error here
    }
}
// Twitt
function twettQuote() {
    const twittUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twittUrl, '_blank');
}
// event litners
newBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', twettQuote);



// On Load
getQuotes();
