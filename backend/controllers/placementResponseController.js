const PlacementRequest = require("../models/PlacementRequest");
const PlacementResponse = require("../models/PlacementResponse");
const Student = require("../models/Student");


const submitPlacementResponse = async (req, res) => {
  try {
    const { requestId, answers } = req.body;

    // 1. Fetch placement request
    const request = await PlacementRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ error: "Placement request not found" });
    }

    // 2. Validate and filter answers
    let filteredAnswers = {};
    for (const field of request.requiredFields) {
      if (!answers[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
      filteredAnswers[field] = answers[field]; // only keep required ones
    }

    // 3. Prevent duplicate
    const existing = await PlacementResponse.findOne({
      requestId,
      studentId: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ error: "You already applied for this request" });
    }

    // 4. Save response (store full linkage)
    const response = new PlacementResponse({
      requestId,              // link to PlacementRequest
      studentId: req.user._id, // link to Student
      answers: filteredAnswers,
      status: "pending"        // 👈 always pending until placement cell reviews
    });

    await response.save();

    // 5. (Optional) also update student model with reference to this request
    await Student.findByIdAndUpdate(req.user._id, {
      $push: { appliedPlacements: requestId }
    });

    // 6. (Optional) also update placementRequest with reference to this student
    await PlacementRequest.findByIdAndUpdate(requestId, {
      $push: { applicants: req.user._id }
    });

    res.status(201).json({
      message: "Response submitted successfully",
      response
    });
  } catch (error) {
    console.error("❌ Error in submitPlacementResponse:", error);
    res.status(500).json({ error: "Server error" });
  }
};




const getDashboardData = async (req, res) => {
  try {
    // 1. Get all placement requests created by this placement cell
    const requests = await PlacementRequest.find({ createdBy: req.user._id });

    // 2. Attach responses dynamically
    const dashboardData = await Promise.all(
      requests.map(async (request) => {
        const responses = await PlacementResponse.find({ requestId: request._id })
          .populate("studentId", "name email rollNo department cgpa");

        return {
          requestId: request._id,
          formTitle: request.formTitle,
          companyName: request.companyName,
          jobRole: request.jobRole,
          deadline: request.deadline,
          requiredFields: request.requiredFields, // 👈 include required fields
          totalApplicants: responses.length,
          applicants: responses.map((resp) => ({
            student: resp.studentId,    // student profile
            answers: resp.answers,      // only contains required fields submitted
            appliedAt: resp.createdAt
          }))
        };
      })
    );

    res.json(dashboardData);
  } catch (error) {
    console.error("❌ Error building dashboard:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getApplicantsData = async (req, res) => {
  try {
    const { id } = req.params; // placement request ID

    // 1. Ensure the placement request exists
    const request = await PlacementRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: "Placement request not found" });
    }

    // 2. Fetch all responses for this request
    const responses = await PlacementResponse.find({ requestId: id })
      .populate("studentId", "name email rollNo department cgpa");

    // 3. Group applicants by department
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
      byDepartment, // 👈 grouped format
    });
  } catch (error) {
    console.error("❌ Error fetching applicants:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

module.exports={
    submitPlacementResponse,
    getDashboardData,
    getApplicantsData
}