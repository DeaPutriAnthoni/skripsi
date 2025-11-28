const express = require('express');
const { healthCheck, clearCache, getSystemStats } = require('../controllers/systemController');

const router = express.Router();

// GET /api/health - Health check endpoint
router.get('/health', healthCheck);

// POST /api/cache/clear - Clear cache endpoints (for admin)
router.post('/cache/clear', clearCache);

// GET /api/stats - System statistics
router.get('/stats', getSystemStats);

module.exports = router;