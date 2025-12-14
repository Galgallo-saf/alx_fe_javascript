// Array to store quotes
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" } 
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `${quotes[randomIndex].text} — <strong>${quotes[randomIndex].category}</strong>`;
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  if (textInput.value && categoryInput.value) {
    quotes.push({ text: textInput.value, category: categoryInput.value });
    textInput.value = "";
    categoryInput.value = "";
    displayRandomQuote(); // Show the newly added quote immediately
  } else {
    alert("Please fill in both the quote and the category.");
  }
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);

// Display an initial random quote
displayRandomQuote();
