const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  alumniId: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumni', required: true },

  type: { 
    type: String, 
    enum: ['job', 'internship', 'program'], 
    required: true 
  },

  title: { type: String, required: true },

  description: { type: String, required: true },
  department: { type: String, required: true },

  // ✅ New field
  companyName: { type: String },       // for job/internship/program

  // Extra fields depending on type
  duration: { type: String },          // internship/program
  programType: { type: String },       // only for program
  salary: { type: Number },            // job/internship
  position: { type: String },          // job/internship
  placementProcess: { type: String },  // job/internship

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
    forwarded: { type: Boolean, default: false },
    

}, { timestamps: true }); // adds createdAt & updatedAt automatically

module.exports = mongoose.model('Request', requestSchema);
