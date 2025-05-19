const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Player = require('./models/Player'); // Import the Player model
const Winner = require('./models/Winner'); // Import the Winner model (make sure you've created it)
const Show = require('./models/Show');

const app = express();
const port = process.env.PORT || 5000;

const shows = new Map();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes


 // Set the lottery end time (1 minute from now)


// POST request to register a new player
app.post('/player-register', async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    // Check if email already exists
    const existingPlayer = await Player.findOne({ email });
    if (existingPlayer) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new player
    const player = new Player({ name, email, password, mobile });
    await player.save();
    res.status(201).json({ message: 'Player registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET request to fetch all players (for testing purposes)
app.get('/player-register', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/player-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const player = await Player.findOne({ email });
    if (!player) {
      return res.status(404).json({ message: 'Player not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, player.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    res.status(200).json({ message: 'Login successful!', name: player.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error!' });
  }
});

// Assuming you are using Express and have a Player model
app.post('/player-register', async (req, res) => {
  const { name, email, password, mobile, number } = req.body;

  try {
    // Check if email already exists
    let player = await Player.findOne({ email });
    
    if (player) {
      // If player exists, update the number
      player.selectedNumber = number;
      await player.save();
      return res.status(200).json({ message: 'Player number updated successfully' });
    } else {
      // If player doesn't exist, create a new player
      player = new Player({ name, email, password, mobile, selectedNumber: number });
      await player.save();
      return res.status(201).json({ message: 'Player registered successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email and password match the hardcoded credentials
    if (email === 'info.4digit@gmail.com' && password === 'thiyagarajan4') {
      // Success response
      return res.status(200).json({ message: "Login successful" });
    }

    // If email or password doesn't match
    return res.status(401).json({ message: "Invalid email or password" });

  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


const defaultWinners = [
  { name: 'John Doe', prize: 'Gold Card', rank: 1, congratulation: 'Congratulations!' },
  { name: 'Jane Smith', prize: 'Silver Card', rank: 2, congratulation: 'Well done!' },
  { name: 'Alice Johnson', prize: 'Bronze Card', rank: 3, congratulation: 'Great effort!' },
];

// **Route to Fetch Winners**
app.get('/api/winners', async (req, res) => {
  try {
    const winners = await Winner.find();
    if (winners.length === 0) {
      // Serve default winners if no data is in the database
      return res.status(200).json(defaultWinners);
    }
    res.status(200).json(winners);
  } catch (error) {
    console.error('Error fetching winners:', error);
    res.status(500).json({ message: 'Error fetching winners', error });
  }
});

// **Admin Route to Update Winners**
app.post('/admin', async (req, res) => {
  try {
    const winners = req.body;

    if (!winners || winners.length === 0) {
      return res.status(400).json({ message: 'No winners data provided' });
    }

    // Clear existing winners and insert new ones
    await Winner.deleteMany();
    await Winner.insertMany(winners);

    res.status(200).json({ message: 'Winners updated successfully' });
  } catch (error) {
    console.error('Error saving winners:', error);
    res.status(500).json({ message: 'Error saving winners', error });
  }
});

app.post('/api/shows', (req, res) => {
  const { endTime } = req.body;
  const showId = Date.now().toString();
  shows.set(showId, new Show(showId, endTime));
  res.json({ showId });
});

// Endpoint to get all numbers for a show
app.get('/api/numbers/:showId', (req, res) => {
  const { showId } = req.params;
  const show = shows.get(showId);
  
  if (!show) {
    return res.status(404).json({ error: 'Show not found' });
  }

  if (show.hasEnded()) {
    shows.delete(showId);
    return res.status(410).json({ error: 'Show has ended' });
  }

  res.json(show.getSelections());
});

// Endpoint to select a number
app.post('/api/numbers', (req, res) => {
  const { userId, showId, number } = req.body;
  const show = shows.get(showId);

  if (!show) {
    return res.status(404).json({ error: 'Show not found' });
  }

  if (show.hasEnded()) {
    shows.delete(showId);
    return res.status(410).json({ error: 'Show has ended' });
  }

  try {
    show.addSelection(userId, number);
    res.json({ message: 'Number selected successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cleanup ended shows periodically
setInterval(() => {
  for (const [showId, show] of shows.entries()) {
    if (show.hasEnded()) {
      shows.delete(showId);
    }
  }
}, 1000 * 60); // Check every minute


// ############## EDIT THIS LATER ##############
// new route to get all players
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});