// Import dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// const placementCellRoutes = require('./routes/placementCell');
const facultyRoutes = require('./routes/facultyRoutes');
// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(express.json()); // for JSON body parsing
app.use(cookieParser());
// Main landing route (e.g., home page or status check)
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Auth routes (e.g., /api/auth/register, /api/auth/login)
app.use('/api/auth', require('./routes/auth'));
// admin login route
app.use('/api/admin', require('./routes/admin'));

// placement login
app.use('/api/placement-cell', require('./routes/placementCell'));
// add faculty
app.use('/api/faculty', facultyRoutes);
// 404 - route not found
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
