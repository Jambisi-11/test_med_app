// const express = require('express');
// const cors = require('cors');
// const connectToMongo = require('./db');
// const UserSchema = require('./models/User'); // Import the User model
// const app = express();

// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// const PORT = process.env.PORT || 8181;

// // Middleware
// app.use(express.json());
// // app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend requests from localhost:3000
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// // Connect to MongoDB
// connectToMongo();

// // Routes
// app.use('/api/auth', require('./routes/auth'));

// // New route to fetch data
// app.get('/api/data', async (req, res) => {
//   try {
//     const data = await UserSchema.find(); // Replace with your actual query
//     res.json(data);
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));

// Serve static files from the React frontend build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve React frontend for undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
