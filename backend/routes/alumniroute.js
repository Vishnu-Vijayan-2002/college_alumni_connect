const express = require("express");
const router = express.Router();
const { getAllAlumni, getAlumniById, updateVerificationStatus, updateAlumniProfile } = require("../controllers/alumniController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public
router.get("/get-all-alumni", getAllAlumni);

// Protected
router.get("/profile/:id", protect, getAlumniById);

// Admin/Faculty: verify alumni
router.put("/:email/status", protect, authorize(["admin", "faculty"]), updateVerificationStatus);

// Update profile by ID
router.put("/profile/:id", protect, updateAlumniProfile);

module.exports = router;
