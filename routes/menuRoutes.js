const express = require('express');
const { getMenu, getMenuById } = require('../controllers/menuController');

const router = express.Router();

// GET /api/menu - Ambil semua menu atau filter berdasarkan kategori
router.get('/', getMenu);

// GET /api/menu/:id - Ambil detail menu berdasarkan ID
router.get('/:id', getMenuById);

module.exports = router;