// Import required modules
const express = require('express');
const flashcards = require('./flashcards');

// Create the Express app
const app = express();

// Load the flashcards routes
app.use('/', flashcards);

// Listen on port 3000
app.listen(3000, () => {
  console.log('Flashcards app listening on port 3000!');
});
