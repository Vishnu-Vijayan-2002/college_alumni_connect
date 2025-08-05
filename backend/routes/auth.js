const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { registerUser } = require('../controllers/authController');

router.post('/register', upload.single('profileImage'), registerUser);

module.exports = router;
