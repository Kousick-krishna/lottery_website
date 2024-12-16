// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const Player = require('./models/Player'); // Import the Player model
// const Winner = require('./models/Winner'); // Import the Winner model (make sure you've created it)

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json()); // Parse incoming JSON requests

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes

// // POST request to register a new player
// app.post('/player-register', async (req, res) => {
//   const { name, email, password, mobile } = req.body;

//   try {
//     // Check if email already exists
//     const existingPlayer = await Player.findOne({ email });
//     if (existingPlayer) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Create new player
//     const player = new Player({ name, email, password, mobile });
//     await player.save();
//     res.status(201).json({ message: 'Player registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET request to fetch all players (for testing purposes)
// app.get('/player-register', async (req, res) => {
//   try {
//     const players = await Player.find();
//     res.status(200).json(players);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.post('/player-login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const player = await Player.findOne({ email });
//     if (!player) {
//       return res.status(404).json({ message: 'Player not found!' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, player.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password!' });
//     }

//     res.status(200).json({ message: 'Login successful!', name: player.name });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error!' });
//   }
// });

// // PATCH request to update the player's lucky number
// app.patch('/player', async (req, res) => {
//   const { email, chosenNumber } = req.body; // Use email as the unique identifier

//   try {
//     // Check if the chosen number is valid (4 digits)
//     if (!/^\d{4}$/.test(chosenNumber)) {
//       return res.status(400).json({ success: false, message: 'Invalid chosen number. Please enter a 4-digit number.' });
//     }

//     // Find the player by email and update the luckyNumber field
//     const updatedPlayer = await Player.findOneAndUpdate(
//       { email }, // Find the player by email
//       { $set: { luckyNumber: chosenNumber } }, // Update the luckyNumber field
//       { new: true } // Return the updated document
//     );

//     if (updatedPlayer) {
//       res.status(200).json({
//         success: true,
//         message: 'Player data updated successfully',
//         player: updatedPlayer,
//       });
//     } else {
//       res.status(404).json({ success: false, message: 'Player not found' });
//     }
//   } catch (error) {
//     console.error('Error updating player:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// app.post('/admin-login', async (req, res) => {
//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     // Check if the email and password match the hardcoded credentials
//     if (email === 'info.4digit@gmail.com' && password === 'thiyagarajan4') {
//       // Success response
//       return res.status(200).json({ message: "Login successful" });
//     }

//     // If email or password doesn't match
//     return res.status(401).json({ message: "Invalid email or password" });

//   } catch (error) {
//     console.error("Error during admin login:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// });


// const defaultWinners = [
//   { name: 'John Doe', prize: 'Gold Card', rank: 1, congratulation: 'Congratulations!' },
//   { name: 'Jane Smith', prize: 'Silver Card', rank: 2, congratulation: 'Well done!' },
//   { name: 'Alice Johnson', prize: 'Bronze Card', rank: 3, congratulation: 'Great effort!' },
// ];

// // **Route to Fetch Winners**
// app.get('/api/winners', async (req, res) => {
//   try {
//     const winners = await Winner.find();
//     if (winners.length === 0) {
//       // Serve default winners if no data is in the database
//       return res.status(200).json(defaultWinners);
//     }
//     res.status(200).json(winners);
//   } catch (error) {
//     console.error('Error fetching winners:', error);
//     res.status(500).json({ message: 'Error fetching winners', error });
//   }
// });

// // **Admin Route to Update Winners**
// app.post('/admin', async (req, res) => {
//   try {
//     const winners = req.body;

//     if (!winners || winners.length === 0) {
//       return res.status(400).json({ message: 'No winners data provided' });
//     }

//     // Clear existing winners and insert new ones
//     await Winner.deleteMany();
//     await Winner.insertMany(winners);

//     res.status(200).json({ message: 'Winners updated successfully' });
//   } catch (error) {
//     console.error('Error saving winners:', error);
//     res.status(500).json({ message: 'Error saving winners', error });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Player = require('./models/Player');
const Winner = require('./models/Winner');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Existing routes...
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

// PATCH request to update the player's lucky number
app.patch('/player', async (req, res) => {
  const { email, chosenNumber } = req.body; // Use email as the unique identifier

  try {
    // Check if the chosen number is valid (4 digits)
    if (!/^\d{4}$/.test(chosenNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid chosen number. Please enter a 4-digit number.' });
    }

    // Find the player by email and update the luckyNumber field
    const updatedPlayer = await Player.findOneAndUpdate(
      { email }, // Find the player by email
      { $set: { luckyNumber: chosenNumber } }, // Update the luckyNumber field
      { new: true } // Return the updated document
    );

    if (updatedPlayer) {
      res.status(200).json({
        success: true,
        message: 'Player data updated successfully',
        player: updatedPlayer,
      });
    } else {
      res.status(404).json({ success: false, message: 'Player not found' });
    }
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
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

// New route for starting the timer
app.post('/start-timer', (req, res) => {
  const { duration } = req.body;
  const endTime = Date.now() + duration * 1000;
  
  io.emit('timerStart', { endTime });
  res.json({ message: 'Timer started successfully' });
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

