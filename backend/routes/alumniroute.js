const express = require("express");
const router = express.Router();

const { getAllAlumni ,updateVerificationStatus} = require("../controllers/alumniController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public: get all alumni
router.get("/get-all-alumni", getAllAlumni);

// Protected: user profile
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Your profile", user: req.user });
});

// Admin/Faculty: verify alumni
// routes/alumniRoutes.js
router.put("/:email/status", protect, authorize(["admin", "faculty"]), updateVerificationStatus);

module.exports = router;
