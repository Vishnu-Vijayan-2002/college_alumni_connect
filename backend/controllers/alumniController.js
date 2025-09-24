const Alumni = require("../models/Alumni");
const Faculty = require("../models/Faculty"); // already imported

// Get all alumni
exports.getAllAlumni = async (req, res) => {
  try {
    const alumniList = await Alumni.find();
    res.status(200).json(alumniList);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update verification status
exports.updateVerificationStatus = async (req, res) => {
  const { email } = req.params;
  const { status } = req.body;
  const user = req.user; // from middleware

  try {
    console.log("=== Verification Debug ===");
    console.log("Email:", email);
    console.log("Status:", status);
    console.log("User:", user);

    // 1️⃣ Validate status
    if (!["pending", "verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be: pending, verified, or rejected" });
    }

    // 2️⃣ Update alumni
    const alumni = await Alumni.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      {
        verificationStatus: status,
        verifiedBy: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        verifiedAt: new Date(),
      },
      { new: true, runValidators: false }
    );

    if (!alumni) {
      return res.status(404).json({
        message: "Alumni not found",
        searchedEmail: email,
      });
    }

    console.log("✅ Verification successful for:", alumni.name);

    res.status(200).json({
      success: true,
      message: `Alumni ${alumni.name} verification status updated to '${status}' by ${user.role} ${user.name}`,
      data: {
        alumni: {
          _id: alumni._id,
          name: alumni.name,
          email: alumni.email,
          verificationStatus: alumni.verificationStatus,
          verifiedBy: alumni.verifiedBy,
          verifiedAt: alumni.verifiedAt,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error updating verification:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
