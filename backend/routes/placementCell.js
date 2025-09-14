const express = require('express');
const router = express.Router();
const { registerPlacementCell, loginPlacementCell } = require('../controllers/placementCellController');
const { createRequest, getAllRequests, updateRequestStatus } =require ("../controllers/requestController");

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

module.exports = router;
