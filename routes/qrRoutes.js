const express = require('express');
const { generateQRCode } = require('../controllers/qrController');

const router = express.Router();

// GET /api/qrcode/:table - Generate QR Code untuk meja
router.get('/:table', generateQRCode);

module.exports = router;