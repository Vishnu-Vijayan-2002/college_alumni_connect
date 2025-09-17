const PlacementRequest = require("../models/PlacementRequest");

// ✅ Placement Cell creates a new placement request (form for students)
const createPlacementRequest = async (req, res) => {
  try {
    const {
      formTitle,
      description,
      eligibleDepartments,
      passingYear,
      minCGPA,
      backlogsAllowed,
      deadline,

      // Optional company-related fields
      companyName,
      jobRole,
      jobType,
      location,
      skillsRequired,
      experienceRequired,
      salary,
      perks,
      selectionProcess,
      bondDetails,
      joiningDate,

      // Student-required fields
      requiredFields,
      status
    } = req.body;

    const newRequest = new PlacementRequest({
      createdBy: req.user.id,

      // Core
      formTitle,
      description,
      eligibleDepartments,
      passingYear,
      minCGPA,
      backlogsAllowed,
      deadline,

      // Optional
      companyName,
      jobRole,
      jobType,
      location,
      skillsRequired,
      experienceRequired,
      salary,
      perks,
      selectionProcess,
      bondDetails,
      joiningDate,

      // Student form requirements
      requiredFields,

      status
    });

    await newRequest.save();

    res.status(201).json({
      message: "Placement request created successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("❌ Error creating placement request:", error);
    res.status(500).json({ message: "Error creating placement request", error });
  }
};

module.exports = { createPlacementRequest };
