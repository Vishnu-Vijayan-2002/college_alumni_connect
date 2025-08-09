const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  inCharge: { type: String, default: '' }, // department name or empty string
  role: { type: String, required: true }
});

module.exports = mongoose.model('Faculty', facultySchema);
