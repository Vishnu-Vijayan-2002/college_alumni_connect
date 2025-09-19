const express = require('express');
const router = express.Router();
const { addFaculty, loginFaculty, getAllFaculties, deleteFaculty, updateFaculty } = require('../controllers/facultyController');
const { authMiddleware,protect,authorize } = require('../middleware/authMiddleware');


// POST /api/faculty/add
router.post('/add', protect, authorize(['admin']), addFaculty);
router.get('/get-all-faculty', protect, authorize(['admin']),getAllFaculties );
router.delete('/delete-faculty/:id', protect, authorize(['admin']),deleteFaculty );
router.put('/update-faculty/:id', protect, authorize(['admin']),updateFaculty );
router.post('/login', loginFaculty);


module.exports = router;
