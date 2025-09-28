// models/PlacementRequest.js
const mongoose = require("mongoose");

const placementRequestSchema = new mongoose.Schema(
  {
    // Who created the form
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlacementCell",
      required: true,
    },

    // 🔥 Track which alumni request this originated from
    alumniRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request", // alumniRequest.js
      required: true,
    },

    // Basic Info
    formTitle: { type: String, required: true },
    description: { type: String, required: true },

    // From alumni request
    companyName: String,
    jobRole: String,
    jobType: String,
    department: String,
    salary: String,
    position: String,
    placementProcess: [String],

    // Eligibility
    eligibleDepartments: { type: [String], required: true },
    passingYear: { type: Number, required: true },
    minCGPA: { type: Number, required: true },
    backlogsAllowed: { type: Boolean, default: false },

    // Placement Cell additions
    requiredFields: {
      type: [String],
      default: ["Resume", "Contact Number", "LinkedIn Profile"],
    },
    deadline: { type: Date, required: true },

    // Status
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlacementRequest", placementRequestSchema);
