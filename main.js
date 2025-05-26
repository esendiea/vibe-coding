import { classifyDescription } from './ai.js';

const form = document.getElementById('entry-form');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const entryList = document.getElementById('entry-list');

// Load entries from localStorage
let entries = JSON.parse(localStorage.getItem('entries')) || [];
renderEntries();

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (!description || isNaN(amount)) {
    alert('Please enter a valid description and amount.');
    return;
  }

  // 🎯 Use AI to classify entry
  const aiResult = classifyDescription(description);

  const entry = {
    description,
    amount,
    type: aiResult.type,         // 'income' or 'expense'
    subcategory: aiResult.subcategory, // 'sales', 'operational cost', etc.
    timestamp: new Date().toLocaleString()
  };

  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));

  renderEntries();
  form.reset();
});

function renderEntries() {
  entryList.innerHTML = '';

  entries.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.className = `entry ${entry.type}`;
    entryDiv.innerHTML = `
      <strong>${entry.type.toUpperCase()}</strong>: 
      ${entry.description} - KES ${entry.amount.toFixed(2)} 
      <br><small>${entry.timestamp} | ${entry.subcategory}</small>
    `;
    entryList.appendChild(entryDiv);
  });
}
