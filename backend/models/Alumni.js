const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passoutYear: { type: Number, required: true },
  department: { type: String, required: true },
  region: { type: String, required: true },
  rollNo: { type: String },
  admissionNo: { type: String },
  interestedIn: [String],
  profileImage: { type: String, default: null }, // ✅ added here
  privilege: { type: Boolean, default: false },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  role: { type: String, default: 'alumni' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alumni', alumniSchema);
