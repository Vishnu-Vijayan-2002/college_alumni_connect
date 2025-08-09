const express = require('express');
const router = express.Router();
const { addFaculty } = require('../controllers/facultyController');
const { authMiddleware } = require('../middleware/authMiddleware');

// POST /api/faculty/add
router.post('/add', authMiddleware, addFaculty);

module.exports = router;
