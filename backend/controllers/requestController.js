// controllers/requestController.js
const RequestModel = require("../models/alumniRequest");
const Alumni = require("../models/Alumni");
const sendEmail = require("../utils/sendEmail");
const sendEmail2 = require("../utils/mailer");
// ✅ Alumni submits a new request
const createRequest = async (req, res) => {
  try {
    const {
      alumniId,
      type,
      title,
      companyName, // ✅ Added company name
      description,
      department,
      duration,
      programType,
      salary,
      position,
      placementProcess,
      forwarded
    } = req.body;

    // Check alumni existence
    const alumni = await Alumni.findById(alumniId);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    // Check alumni verification
    if (alumni.verificationStatus.trim() !== "verified") {
      return res
        .status(403)
        .json({ message: "Only verified alumni can post requests" });
    }

    // Ensure name and email exist
    if (!alumni.name || !alumni.email) {
      return res
        .status(400)
        .json({ message: "Alumni name and email are required" });
    }

    const newRequest = new RequestModel({
      alumniId,
      type,
      title,
      companyName, // ✅ include company name in DB
      description,
      department,
      duration,
      programType,
      salary,
      position,
      placementProcess,
      forwarded
    });

    await newRequest.save();

    // Send email notification to admin/placement cell
    const emailRecipient = "vishnuvijayan7909@gmail.com"; // replace with your target email
    await sendEmail(
      emailRecipient,
      `New ${type} request submitted`,
      `Alumni ${alumni.name} submitted a new ${type} request.`,
      `
        <h2>New Request Submitted</h2>
        <p><b>Alumni:</b> ${alumni.name} (${alumni.email})</p>
        <p><b>Type:</b> ${type}</p>
        <p><b>Title:</b> ${title}</p>
        <p><b>Company/Organization:</b> ${companyName || "N/A"}</p>
        <p><b>Description:</b> ${description}</p>
        <p><b>Department:</b> ${department}</p>
        <p><b>Position:</b> ${position || "N/A"}</p>
        <p><b>Salary:</b> ${salary || "N/A"}</p>
        <p><b>Duration:</b> ${duration || "N/A"}</p>
        <p><b>Placement Process:</b> ${placementProcess || "N/A"}</p>
      `
    );

    // ✅ Return full request in response including company name
    res.status(201).json({
      message: "Request submitted successfully & email sent",
      request: newRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting request", error });
  }
};


// ✅ Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await RequestModel.find()
      .populate("alumniId", "name email") // 👈 fetch alumni's name & email
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests", error });
  }
};


// ✅ Approve/Reject a request
// Update request status (placement-cell only)
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // "approved" | "rejected" | "pending"

    // Validate status values
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find the request first
    const request = await RequestModel.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // ✅ If rejected → delete instead of keeping it
    if (status === "rejected") {
      // await RequestModel.findByIdAndDelete(req.params.id);
      await RequestModel.findByIdAndUpdate(req.params.id,{ status: "rejected" },{ new: true });

      // Inform alumni via email
      const alumni = await Alumni.findById(request.alumniId);
      if (alumni && alumni.email) {
        const subject = "Your Request has been Rejected";
        const text = `Hello ${alumni.name},

Your request titled "${request.title}" has been reviewed by the Placement Cell.

❌ Status: REJECTED

Thank you,
Placement Cell Team`;

        await sendEmail(alumni.email, subject, text);
      }

      return res.json({
        message: "Request rejected and deleted successfully",
        requestId: req.params.id,
      });
    }

    // ✅ Else (approved or pending) → update normally
    const updated = await RequestModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Notify alumni via email
    const alumni = await Alumni.findById(updated.alumniId);
    if (alumni && alumni.email) {
      const subject = "Your Request Status has been Updated";
      const text = `Hello ${alumni.name},

Your request titled "${updated.title}" has been reviewed by the Placement Cell.

📌 Status: ${status.toUpperCase()}

Thank you,
Placement Cell Team`;

      await sendEmail(alumni.email, subject, text);
    }

    res.json({
      message: `Request status updated to ${status}`,
      request: updated,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ message: "Error updating request", error });
  }
};

const getApprovedRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await RequestModel.findOne({ _id: id, status: "approved" });

    if (!request) {
      return res.status(404).json({ message: "Approved request not found" });
    }

    res.json(request);
  } catch (error) {
    console.error("Error fetching approved request:", error);
    res.status(500).json({ message: "Error fetching approved request", error });
  }
};


module.exports = {
  createRequest,
  getAllRequests,
  updateRequestStatus,
  getApprovedRequestById
};
