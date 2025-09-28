const PlacementRequest = require("../models/PlacementRequest");
const PlacementResponse = require("../models/PlacementResponse");
const Student = require("../models/Student");

// Submit a placement response (student)
const submitPlacementResponse = async (req, res) => {
  try {
    const { requestId, answers } = req.body;

    const request = await PlacementRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Placement request not found" });
    }

    // Validate required fields
    let filteredAnswers = {};
    for (const field of request.requiredFields) {
      if (!answers[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
      filteredAnswers[field] = answers[field];
    }

    // Prevent duplicate application
    const existing = await PlacementResponse.findOne({
      requestId,
      studentId: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ error: "You already applied for this request" });
    }

    const response = new PlacementResponse({
      requestId,
      studentId: req.user._id,
      answers: filteredAnswers,
      status: "pending",
    });

    await response.save();

    await Student.findByIdAndUpdate(req.user._id, {
      $push: { appliedPlacements: requestId },
    });

    await PlacementRequest.findByIdAndUpdate(requestId, {
      $push: { applicants: req.user._id },
    });

    res.status(201).json({ message: "Response submitted successfully", response });
  } catch (error) {
    console.error("❌ Error in submitPlacementResponse:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get dashboard data
const getDashboardData = async (req, res) => {
  try {
    let requests;

    if (req.user.role === "placement-cell") {
      requests = await PlacementRequest.find({ createdBy: req.user._id });
    } else if (req.user.role === "faculty") {
      requests = await PlacementRequest.find();
    } else if (req.user.role === "student") {
      requests = await PlacementRequest.find({ deadline: { $gte: new Date() } });
    } else {
      return res.status(403).json({ error: "Not allowed for this role" });
    }

    const dashboardData = await Promise.all(
      requests.map(async (request) => {
        const responses = await PlacementResponse.find({ requestId: request._id })
          .populate("studentId", "name email rollNo department cgpa");

        return {
          requestId: request._id,
          formTitle: request.formTitle,
          companyName: request.companyName,
          jobRole: request.jobRole,
          jobType: request.jobType,
          department: request.department,
          salary: request.salary,
          position: request.position,
          placementProcess: request.placementProcess,
          deadline: request.deadline,
          requiredFields: request.requiredFields,
          totalApplicants: responses.length,
          applicants: responses.map((resp) => ({
             _id:resp._id,   
            student: resp.studentId,
            answers: resp.answers,
            appliedAt: resp.createdAt,
            status: resp.status,
          })),
        };
      })
    );

    res.json(dashboardData);
  } catch (error) {
    console.error("❌ Error building dashboard:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get applicants for a specific placement request
const getApplicantsData = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await PlacementRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: "Placement request not found" });
    }

    const responses = await PlacementResponse.find({ requestId: id })
      .populate("studentId", "name email rollNo department cgpa");

    const byDepartment = {};
    responses.forEach((resp) => {
      const dept = resp.studentId.department || "Unknown";
      if (!byDepartment[dept]) byDepartment[dept] = [];
      byDepartment[dept].push({
        student: resp.studentId,
        answers: resp.answers,
        appliedAt: resp.createdAt,
        status: resp.status,
      });
    });

    res.json({
      requestId: id,
      formTitle: request.formTitle,
      totalApplicants: responses.length,
      byDepartment,
    });
  } catch (error) {
    console.error("❌ Error fetching applicants:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// ✅ Faculty can update application status


const updateApplicationStatus = async (req, res) => {
  try {
    const { responseId, status } = req.body;
    const allowedStatuses = ["pending", "approved", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const response = await PlacementResponse.findById(responseId);
    if (!response) {
      return res.status(404).json({ error: "Application response not found" });
    }

    response.status = status;
    await response.save();

    res.json({ message: "Application status updated", response });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};


module.exports = {
  submitPlacementResponse,
  getDashboardData,
  getApplicantsData,
  updateApplicationStatus, // 🔹 export new function
};
