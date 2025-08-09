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
router.post('/login', adminLogin);
// placement cell
router.post('/login', loginPlacementCell);
// for testing 
// router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
//   res.json({ message: 'Welcome Admin!' });
// });
// router.get('/student', protect, authorizeRoles('student'), (req, res) => {
//   res.json({ message: 'Welcome Student!' });
// });
// router.get('/faculty', protect, authorizeRoles('faculty'), (req, res) => {
//   res.json({ message: 'Welcome Faculty!' });
// });
// router.get('/placement', protect, authorizeRoles('placement'), (req, res) => {
//   res.json({ message: 'Welcome Placement Cell!' });
// });
// router.get('/alumni', protect, authorizeRoles('alumni'), (req, res) => {
//   res.json({ message: 'Welcome alumni !' });
// });

module.exports = router;
