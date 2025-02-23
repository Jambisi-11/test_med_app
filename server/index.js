const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const SomeModel = require('./models/User'); // Change from Data to User
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 8181;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend requests from localhost:3000

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', require('./routes/auth'));

// New route to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const data = await SomeModel.find(); // Replace with your actual query
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
