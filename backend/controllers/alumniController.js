const Alumni = require("../models/Alumni");
const Faculty = require("../models/Faculty");

// Get all alumni
exports.getAllAlumni = async (req, res) => {
  try {
    const alumniList = await Alumni.find();
    res.status(200).json({ success: true, data: alumniList });
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get alumni by ID
exports.getAlumniById = async (req, res) => {
  const { id } = req.params;

  try {
    const alumni = await Alumni.findById(id);

    if (!alumni) {
      return res.status(404).json({ success: false, message: "Alumni not found" });
    }

    res.status(200).json({ success: true, data: alumni });
  } catch (error) {
    console.error("Error fetching alumni by ID:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update verification status (admin/faculty)
exports.updateVerificationStatus = async (req, res) => {
  const { email } = req.params;
  const { status } = req.body;
  const user = req.user;

  try {
    if (!["pending", "verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const alumni = await Alumni.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      {
        verificationStatus: status,
        verifiedBy: { id: user._id, name: user.name, email: user.email, role: user.role },
        verifiedAt: new Date(),
      },
      { new: true }
    );

    if (!alumni) return res.status(404).json({ message: "Alumni not found" });

    res.status(200).json({ success: true, message: "Verification updated", data: alumni });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update alumni profile by ID
exports.updateAlumniProfile = async (req, res) => {
  const { id } = req.params; // use _id now
  const { company, position, experience, profileImage, department, passoutYear } = req.body;

  try {
    const updateFields = {};
    if (company !== undefined) updateFields.company = company;
    if (position !== undefined) updateFields.position = position;
    if (experience !== undefined) updateFields.experience = experience;
    if (profileImage !== undefined) updateFields.profileImage = profileImage;
    if (department !== undefined) updateFields.department = department;
    if (passoutYear !== undefined) updateFields.passoutYear = passoutYear;

    const updatedAlumni = await Alumni.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

    if (!updatedAlumni) return res.status(404).json({ message: "Alumni not found" });

    res.status(200).json({ success: true, message: "Profile updated successfully", data: updatedAlumni });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
