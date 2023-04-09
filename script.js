
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


let quotes = []

function newQuote(){
    loading();
    const quote = quotes[ Math.floor(Math.random() * quotes.length ) ]

    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    if (quote.author){
        authorText.textContent = quote.author;
    } else {
        authorText.textContent = "Unknown";
    }
    quoteText.textContent = quote.text;
    complete();
}


async function getQuotes(){
    loading();
    const url = "https://type.fit/api/quotes";

    try{
        const response = await fetch(url);
        quotes = await response.json()
        newQuote();
    } catch(e) {
        console.log(e);
        getQuotes();
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQuotes();