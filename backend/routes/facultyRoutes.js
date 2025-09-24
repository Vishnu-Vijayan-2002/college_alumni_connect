const express = require('express');
const router = express.Router();
const { addFaculty, loginFaculty } = require('../controllers/facultyController');
const { authMiddleware,protect,authorize } = require('../middleware/authMiddleware');


// POST /api/faculty/add
router.post('/add', protect, authorize(['admin']), addFaculty);
router.post('/login', loginFaculty);

module.exports = router;
