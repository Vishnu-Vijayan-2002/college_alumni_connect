const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { registerUser, loginUser } = require('../controllers/authController');
const { adminLogin } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/protect');
const { loginPlacementCell } = require('../controllers/placementCellController');

// Register and Login
router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
// router.post('/login', adminLogin);
// placement cell
module.exports = router;
