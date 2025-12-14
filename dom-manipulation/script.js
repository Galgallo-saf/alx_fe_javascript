let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" }
];

// Show random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `${quotes[randomIndex].text} — ${quotes[randomIndex].category}`;
}

// Add new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  if (textInput.value && categoryInput.value) {
    quotes.push({ text: textInput.value, category: categoryInput.value });
    saveQuotesToLocal();
    textInput.value = "";
    categoryInput.value = "";
    showRandomQuote();
  } else {
    alert("Please fill in both the quote and the category.");
  }
}

// Save quotes to local storage
function saveQuotesToLocal() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotesFromLocal() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

// Fetch quotes from server (mock API)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // example mock
    const serverQuotes = await response.json();
    // Map server data to quote format
    const formattedQuotes = serverQuotes.map(post => ({
      text: post.title,
      category: "Server"
    }));
    return formattedQuotes;
  } catch (err) {
    console.error("Error fetching quotes from server:", err);
    return [];
  }
}

// Sync quotes with server
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  // Simple conflict resolution: server quotes take precedence
  quotes = [...serverQuotes, ...quotes.filter(q => !serverQuotes.some(sq => sq.text === q.text))];
  saveQuotesToLocal();
  showRandomQuote();
  // Add notification (example)
  alert("Quotes synced with server!");
}

// Periodically sync every 30 seconds
setInterval(syncQuotes, 30000);

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Load initial quotes
loadQuotesFromLocal();
showRandomQuote();
