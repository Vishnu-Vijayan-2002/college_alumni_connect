const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { registerUser, loginUser } = require('../controllers/authController');
const { loginPlacementCell } = require('../controllers/placementCellController');
const {protect,authorize} = require('../middleware/authMiddleware');
const {getPlacementRequests} = require('../controllers/placementRequestController');
// Register and Login
router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
//  GET /api/placement-cell/placement-request → to see all placement request to students 
router.get("/placement-request", protect, authorize(["student"]), getPlacementRequests);

// router.post('/login', adminLogin);
// placement cell

router.post('/login', loginPlacementCell);
module.exports = router;
