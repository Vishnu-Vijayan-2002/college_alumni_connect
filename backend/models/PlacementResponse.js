const mongoose = require("mongoose");

const placementResponseSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlacementRequest",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // or "User" if students are stored in User model
      required: true,
    },
    answers: {
      type: Map,
      of: String, // flexible: store any field/value pairs
      required: true,
    },
    status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",   // 👈 this ensures automatic pending
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlacementResponse", placementResponseSchema);
