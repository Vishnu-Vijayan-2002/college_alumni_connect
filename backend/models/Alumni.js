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
  profileImage: { type: String, default: null },
  privilege: { type: Boolean, default: false },

  // Verification - Updated to match controller
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'], // Changed 'approved' to 'verified'
    default: 'pending'
  },
  verifiedBy: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, default: null },
    role: { type: String, default: null },
    email: { type: String, default: null } // Added email field
  },
  verifiedAt: { type: Date, default: null }, // Added verification timestamp

  // Work info
  company: { type: String, default: null },
  position: { type: String, default: null },
  experience: { type: Number, default: 0 },

  // Role and timestamp
  role: { type: String, default: 'alumni' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alumni', alumniSchema); // Changed model name to singular 'Alumni'