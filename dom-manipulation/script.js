// ======= Quotes Data and Storage =======
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" }
];

let selectedCategory = localStorage.getItem("selectedCategory") || "All";

// ======= DOM Elements =======
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categorySelect = document.getElementById("categorySelect");

// ======= Display Random Quote =======
function showRandomQuote() {
  const filteredQuotes = selectedCategory === "All" ? quotes : quotes.filter(q => q.category === selectedCategory);
  if (!filteredQuotes.length) {
    quoteDisplay.innerHTML = "No quotes available for this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const q = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${q.text}" — ${q.category}`;
}

// ======= Add New Quote =======
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();
  if (!text || !category) {
    alert("Please fill in both the quote and the category.");
    return;
  }
  const newQ = { text, category };
  quotes.push(newQ);
  saveQuotes();
  populateCategories();
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  showRandomQuote();
  postQuoteToServer(newQ); // send new quote to server
}

// ======= Categories Filter =======
function populateCategories() {
  const uniqueCategories = ["All", ...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = "";
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === selectedCategory) option.selected = true;
    categorySelect.appendChild(option);
  });
}

function filterQuotes() {
  selectedCategory = categorySelect.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote();
}

// ======= Web Storage =======
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ======= JSON Import/Export =======
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(evt) {
    try {
      const importedQuotes = JSON.parse(evt.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      showRandomQuote();
      alert("Quotes imported successfully!");
    } catch (e) {
      alert("Invalid JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ======= Server Sync =======
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data.map(item => ({ text: item.title, category: "Server" }));
  } catch (error) {
    console.error("Error fetching from server:", error);
    return [];
  }
}

async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
  } catch (error) {
    console.error("Error posting to server:", error);
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  serverQuotes.forEach(q => {
    if (!quotes.find(localQ => localQ.text === q.text)) {
      quotes.push(q);
    }
  });
  saveQuotes();
  populateCategories();
  showRandomQuote();
  console.log("Quotes synced with server!");
}

// ======= Event Listeners =======
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
categorySelect.addEventListener("change", filterQuotes);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// ======= Initial Setup =======
populateCategories();
showRandomQuote();
syncQuotes();
setInterval(syncQuotes, 60000); // sync every 60s
