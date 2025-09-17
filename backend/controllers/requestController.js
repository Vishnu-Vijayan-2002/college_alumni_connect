// controllers/requestController.js
const RequestModel = require("../models/alumniRequest");
const Alumni = require("../models/Alumni");
const sendEmail = require("../utils/sendEmail");
// ✅ Alumni submits a new request
const createRequest = async (req, res) => {
  try {
    const {
      alumniId,
      type,
      title,
      description,
      department,
      duration,
      programType,
      salary,
      position,
      placementProcess,
    } = req.body;

    // Check alumni verification
    const alumni = await Alumni.findById(alumniId);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }
    if (alumni.verificationStatus.trim() !== "approved") {
      return res
        .status(403)
        .json({ message: "Only verified alumni can post requests" });
    }

    const newRequest = new RequestModel({
      alumniId,
      type,
      title,
      description,
      department,
      duration,
      programType,
      salary,
      position,
      placementProcess,
    });

    await newRequest.save();

    // ✅ Send email notification to admin/placement cell
    const emailRecipient = "akashp4010@gmail.com"; // replace with your target email
    await sendEmail(
      emailRecipient,
      `New ${type} request submitted`,
      `Alumni ${alumni.name} submitted a new ${type} request.`,
      `
        <h2>New Request Submitted</h2>
        <p><b>Alumni:</b> ${alumni.name} (${alumni.email})</p>
        <p><b>Type:</b> ${type}</p>
        <p><b>Title:</b> ${title}</p>
        <p><b>Description:</b> ${description}</p>
        <p><b>Department:</b> ${department}</p>
        <p><b>Position:</b> ${position || "N/A"}</p>
        <p><b>Salary:</b> ${salary || "N/A"}</p>
        <p><b>Duration:</b> ${duration || "N/A"}</p>
        <p><b>Placement Process:</b> ${placementProcess || "N/A"}</p>
      `
    );

    res.status(201).json({
      message: "Request submitted successfully & email sent",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting request", error });
  }
};
// ✅ Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await RequestModel.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requests", error });
  }
};

// ✅ Approve/Reject a request
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // "approved" | "rejected"
    const updated = await RequestModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Request updated", request: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  updateRequestStatus,
};
