// server.js

// Import dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true,               // allow cookies and Authorization headers
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const placementCellRoutes = require('./routes/placementCell');
const facultyRoutes = require('./routes/facultyRoutes');
const alumniRoutes = require('./routes/alumniroute');

app.use('/', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/placement-cell', placementCellRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/alumni', alumniRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Centralized error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
