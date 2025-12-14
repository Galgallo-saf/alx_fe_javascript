// Array to store quotes
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" } 
];

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `${quotes[randomIndex].text} — ${quotes[randomIndex].category}`;
}

// Function to dynamically create the form for adding a new quote
function createAddQuoteForm() {
  const container = document.getElementById("formContainer");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.id = "addQuoteBtn";
  addButton.textContent = "Add Quote";

  container.appendChild(textInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);

  // Attach event listener after creating the button
  addButton.addEventListener("click", addQuote);
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  if (textInput.value && categoryInput.value) {
    quotes.push({ text: textInput.value, category: categoryInput.value });
    textInput.value = "";
    categoryInput.value = "";
    showRandomQuote(); // Show the newly added quote immediately
  } else {
    alert("Please fill in both the quote and the category.");
  }
}

// Initialize
showRandomQuote();
createAddQuoteForm();

// Event listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
