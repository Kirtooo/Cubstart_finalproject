// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FlashcardSet = require('./models/flashcardSet');

// Create the Express app
const app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/flashcards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Configure session middleware
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport to use Google authentication
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
}, (accessToken, refreshToken, profile, cb) => {
  // Check if the user already exists in the database
  FlashcardSet.findOne({ userId: profile.id }, (err, flashcardSet) => {
    if (err) {
      return cb(err);
    }
    if (!flashcardSet) {
      // Create a new flashcard set for the user
      flashcardSet = new FlashcardSet({ userId: profile.id });
      flashcardSet.save((err) => {
        if (err) {
          return cb(err);
        }
        return cb(null, flashcardSet);
      });
    } else {
      return cb(null, flashcardSet);
    }
  });
}));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  FlashcardSet.findById(id, (err, flashcardSet) => {
    if (err) {
      return cb(err);
    }
    cb(null, flashcardSet);
  });
});

// API endpoint for getting the user's flashcard sets
app.get('/api/flashcardSets', (req, res) => {
  const userId = req.user.userId;
  FlashcardSet.find({ userId }, (err, flashcardSets) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while getting the flashcard sets.');
    } else {
      res.send(flashcardSets);
    }
  });
});

// API endpoint for adding a flashcard set
app.post('/api/flashcardSets', (req, res) => {
  const userId = req.user.userId;
  const flashcardSet = new FlashcardSet({ userId, ...req.body });
  flashcardSet.save((err, flashcardSet) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while adding the flashcard set.');
    } else {
      res.send(flashcardSet);
    }
  });
});

// API endpoint for updating a flashcard set
app.put('/api/flashcardSets/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;
  FlashcardSet.findOneAndUpdate({ _id: id, userId }, req.body, { new: true }, (err, flashcardSet) => {
    if (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating the flashcard set.');
      } else if (!flashcardSet) {
        res.status(404).send('Flashcard set not found.');
      } else {
        res.send(flashcardSet);
      }
    });
  });

// API endpoint for deleting a flashcard set
app.delete('/api/flashcardSets/:id', (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
FlashcardSet.findOneAndDelete({ _id: id, userId }, (err, flashcardSet) => {
if (err) {
    console.error(err);
    res.status(500).send('An error occurred while deleting the flashcard set.');
} else if (!flashcardSet) {
    res.status(404).send('Flashcard set not found.');
} else {
    res.send(flashcardSet);
}
});
});
// Serve the static files for the client
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log('Server listening on port ${PORT}.'');
});
