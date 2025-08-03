const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
  passoutYear: { type: Number, required: true },
  department: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'alumni', 'admin', 'faculty', 'placement-cell'],
    default: 'student',
    required: true
  },
  interestedIn: {
    type: [String],
    enum: ['jobs', 'internships', 'mentorship', 'webinars', 'networking'],
    default: []
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
