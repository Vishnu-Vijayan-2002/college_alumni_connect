const express = require('express');
const router = express.Router();
const { registerPlacementCell, loginPlacementCell } = require('../controllers/placementCellController');

// POST /api/placement-cell/register
router.post('/register', registerPlacementCell);

// POST /api/placement-cell/login
router.post('/login', loginPlacementCell);

module.exports = router;
