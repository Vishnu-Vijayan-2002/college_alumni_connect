const express = require('express');
const router = express.Router();
const { registerPlacementCell, loginPlacementCell } = require('../controllers/placementCellController');
const { createRequest, getAllRequests, updateRequestStatus } =require ("../controllers/requestController");
const {createPlacementRequest,getPlacementRequests } = require("../controllers/placementRequestController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { submitPlacementResponse,getDashboardData } = require("../controllers/placementResponseController");


// POST /api/placement-cell/register
router.post('/register', registerPlacementCell);

// POST /api/placement-cell/login
router.post('/login', loginPlacementCell);

/* ========= Request Routes ========= */
// POST /api/requests → create new request (job, internship, program)
router.post("/new-request", createRequest);

// GET /api/requests → get all requests
router.get("/get-request", getAllRequests);

// PATCH /api/requests/:id → approve/reject a request
// http://localhost:5000/api/requests/request_id
router.patch("/:id", updateRequestStatus);

// POST /api/placement-cell/placement-request → create new placement form
router.post("/placement-request", protect, authorize(["placement-cell"]), createPlacementRequest);
// GET /api/placement-cell/placement-request → to see all placement request to students 
router.get("/placement-request", protect, authorize(["student"]), getPlacementRequests);
//POST /api/placement-cell/apply  → store students response   (student apply)
router.post("/apply", protect, authorize(["student"]), submitPlacementResponse);

// GET /api/placement-cell/responses/:requestId
router.get("/dashboard",protect,authorize(["placement-cell"]),getDashboardData);


module.exports = router;


