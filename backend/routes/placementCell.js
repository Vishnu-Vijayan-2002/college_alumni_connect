const express = require('express');
const router = express.Router();
const { registerPlacementCell, loginPlacementCell } = require('../controllers/placementCellController');
const { createRequest, getAllRequests, updateRequestStatus,getApprovedRequestById,getApprovedRequests } =require ("../controllers/requestController");
const { submitPlacementResponse,getDashboardData,getApplicantsData } = require("../controllers/placementResponseController");
const { createPlacementRequest,getPlacementRequests, getPlacementRequestById,sendToStudents } = require("../controllers/placementRequestController");
const { protect, authorize } = require("../middleware/authMiddleware");


// POST /api/placement-cell/register
router.post('/register', registerPlacementCell);

// POST /api/placement-cell/login
router.post('/login', loginPlacementCell);

/* ========= Request Routes ========= */
// POST /api/requests → create new request (job, internship, program)
        
// GET /api/requests → get all requests
router.get("/get-request", getAllRequests);

// GET /api/requests → get Approved request requests + not sent
// router.get('/approved-request',getApprovedRequests);

// PATCH /api/requests/:id → approve/reject a request
// http://localhost:5000/api/requests/request_id
router.patch("/requests/:id", updateRequestStatus);

// POST /api/placement-cell/placement-request → create new placement form
router.post("/placement-request", protect, authorize(["placement-cell"]), createPlacementRequest);

// POST /api/placement-cell/send-to-students/:id
router.post("/send-to-students/:id",protect,authorize(["placement-cell"]),sendToStudents);

//POST /api/placement-cell/apply  → store students response   (student apply)
router.post("/apply", protect, authorize(["student"]), submitPlacementResponse);

// GET /api/placement-cell/placement-request → to see all placement request to students 
// GET /api/placement-cell/placement-request/:id → fetch single placement form details
router.get("/placement-request/:id", protect, authorize(["student","placement-cell"]), getPlacementRequestById);

// GET /api/placement-cell/responses/:requestId
router.get("/dashboard",protect,authorize(["placement-cell"]),getDashboardData);

// GET  /api/placement-cell/dashboard/:id for showing applicants of each placement request
router.get("/dashboard/:id",protect,authorize(["placement-cell"]),getApplicantsData);

// GET /api/placement-cell/placement-form/:id for showing placement provider details by id
router.get("/placement-form/:id",protect,authorize(["student","placement-cell"]),getApprovedRequestById);





module.exports = router;


