// Import dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

// Import routes
const facultyRoutes = require('./routes/facultyRoutes');
const requestRoutes = require('./routes/placementCell');
const alumniRoutes = require('./routes/alumniroute'); // ✅ fixed import

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/placement-cell', require('./routes/placementCell'));
app.use('/api/faculty', facultyRoutes);
app.use('/api/alumni', alumniRoutes); // ✅ only once
app.use('/api/requests', requestRoutes);

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
