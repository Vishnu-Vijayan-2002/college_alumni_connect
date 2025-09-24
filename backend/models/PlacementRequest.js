const mongoose = require("mongoose");

const placementRequestSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlacementCell",
      required: true,
    },

    // Basic Info
    formTitle: { type: String, required: true },     // e.g., "Infosys Campus Drive 2025"
    description: { type: String, required: true },   // general instructions for students

    // Core Eligibility (usually mandatory)
    eligibleDepartments: {
      type: [String],   // ["CSE", "ECE", "EEE"]
      required: true,
    },
    passingYear: { type: Number, required: true },   // e.g., 2025
    minCGPA: { type: Number, required: true },       // e.g., 7.0
    backlogsAllowed: { type: Boolean, default: false },

    // Extra Company-Specific Fields (optional)
    companyName: { type: String },                  
    jobRole: { type: String },                       // e.g., Software Engineer
    jobType: { type: String, enum: ["Full-Time", "Internship", "Part-Time", "Apprenticeship"] },
    location: { type: String },                      // e.g., "Bangalore / Remote"
    skillsRequired: { type: [String] },              // e.g., ["Java", "DSA", "React"]
    experienceRequired: { type: String },            // e.g., "Fresher / 1-2 years"
    salary: { type: String },                        // e.g., "6 LPA" or "₹40,000/month"
    perks: { type: [String] },                       // e.g., ["Free Lunch", "Cab Facility"]
    selectionProcess: { type: [String] },            // e.g., ["Aptitude", "Technical", "HR"]
    bondDetails: { type: String },                   // e.g., "2 years service agreement"
    joiningDate: { type: Date },                     // Expected joining date

    // What students must upload/fill
    requiredFields: {
      type: [String],
      default: ["Resume", "Contact Number", "LinkedIn Profile"],
    },

    // Deadline & Status
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlacementRequest", placementRequestSchema);
