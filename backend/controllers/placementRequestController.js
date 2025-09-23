const PlacementRequest = require("../models/PlacementRequest");
const AlumniRequest = require("../models/alumniRequest"); // Alumni's request model

/**
 * ✅ Placement Cell creates a custom placement request (not from alumni)
 */
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
      requiredFields,
      status,
    } = req.body;

    const newRequest = new PlacementRequest({
      createdBy: req.user.id,
      formTitle,
      description,
      eligibleDepartments,
      passingYear,
      minCGPA,
      backlogsAllowed,
      deadline,
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
      requiredFields,
      status: status || "open",
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

/**
 * ✅ Students view placement requests
 * (only `open` ones and not past deadline)
 */
const getPlacementRequests = async (req, res) => {
  try {
    const today = new Date();
    const requests = await PlacementRequest.find({
      deadline: { $gte: today },
      status: "open",
    })
      .populate("createdBy", "name email")
      .populate("alumniRequest") // show alumni reference if exists
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching placement requests:", error);
    res.status(500).json({ message: "Error fetching placement requests", error });
  }
};

/**
 * ✅ Get placement request by ID
 */
const getPlacementRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await PlacementRequest.findById(id)
      .populate("createdBy", "name email")
      .populate("alumniRequest");

    if (!request) {
      return res.status(404).json({ message: "Placement request not found" });
    }
    res.json(request);
  } catch (error) {
    console.error("❌ Error fetching placement request:", error);
    res.status(500).json({ message: "Error fetching placement request", error });
  }
};

/**
 * ✅ Placement Cell forwards an approved AlumniRequest to students
 * → Only at this moment it is stored in PlacementRequest collection
 */
const sendToStudents = async (req, res) => {
  try {
    const { id } = req.params; // alumni request ID
    const { requiredFields, deadline, passingYear, minCGPA, backlogsAllowed } = req.body;

    // 1. Find alumni request
    const alumniReq = await AlumniRequest.findById(id).populate("alumniId", "name email");
    if (!alumniReq || alumniReq.status !== "approved") {
      return res.status(404).json({ message: "Approved alumni request not found" });
    }

    // 2. Create PlacementRequest (copy + extra fields)
    const newPlacement = new PlacementRequest({
      createdBy: req.user._id,      // Placement Cell
      alumniRequest: alumniReq._id, // Reference to original alumni request

      // Copy from Alumni Request
      formTitle: alumniReq.title,
      description: alumniReq.description,
      companyName: alumniReq.companyName || "Unknown",
      jobRole: alumniReq.position,
      jobType: alumniReq.programType,
      location: "To be announced",
      salary: alumniReq.salary,
      selectionProcess: alumniReq.placementProcess ? [alumniReq.placementProcess] : [],

      // Eligibility
      eligibleDepartments: [alumniReq.department],
      passingYear: passingYear || new Date().getFullYear(),
      minCGPA: minCGPA || 0,
      backlogsAllowed: backlogsAllowed ?? true,

      // Extra from placement cell
      requiredFields:
        requiredFields && requiredFields.length > 0
          ? requiredFields
          : ["Resume", "Contact Number"],
      deadline: deadline
        ? new Date(deadline)
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // default +7 days

      status: "open",
    });

    await newPlacement.save();

    // 3. Mark alumni request as forwarded ✅
    await AlumniRequest.findByIdAndUpdate(id, { forwarded: true });

    res.status(201).json({
      message: "✅ Alumni request successfully forwarded to students",
      placement: newPlacement,
    });
  } catch (error) {
    console.error("❌ Error sending to students:", error);
    res.status(500).json({ message: "Error sending to students", error });
  }
};


module.exports = {
  createPlacementRequest,
  getPlacementRequests,
  getPlacementRequestById,
  sendToStudents
};
