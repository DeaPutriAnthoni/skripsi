const { asyncHandler, successResponse, errorResponse, Validator } = require('../utils/response');
const pool = require('../config/database');
const NodeCache = require('node-cache');

// Cache configuration
const menuCache = new NodeCache({ 
    stdTTL: parseInt(process.env.MENU_CACHE_TTL) || 300, 
    checkperiod: 120 
});

// GET /api/menu - Ambil semua menu atau filter berdasarkan kategori
const getMenu = asyncHandler(async (req, res) => {
    const { category } = req.query;
    
    // Validate category if provided
    if (category && !['makanan', 'minuman'].includes(category)) {
        return errorResponse(res, 'Kategori tidak valid', 400, 'INVALID_CATEGORY');
    }
    
    const cacheKey = category ? `menu_${category}` : 'menu_all';
    
    // Try to get from cache first
    let cachedData = menuCache.get(cacheKey);
    if (cachedData) {
        return successResponse(res, {
            data: cachedData,
            count: cachedData.length,
            cached: true
        }, 'Menu berhasil diambil dari cache');
    }

    // Build query safely
    let query = 'SELECT id, name, category, price, description, image_url FROM menu_items ORDER BY category ASC, name ASC';
    const params = [];

    if (category) {
        query = 'SELECT id, name, category, price, description, image_url FROM menu_items WHERE category = ? ORDER BY name ASC';
        params.push(category);
    }

    const [rows] = await pool.query(query, params);
    
    // Cache the result
    menuCache.set(cacheKey, rows);
    
    successResponse(res, {
        data: rows,
        count: rows.length,
        cached: false
    }, 'Menu berhasil diambil');
});

// GET /api/menu/:id - Ambil detail menu berdasarkan ID
const getMenuById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const menuId = Validator.validateMenuId(id);
    
    const [rows] = await pool.query(
        'SELECT * FROM menu_items WHERE id = ?', 
        [menuId]
    );

    if (rows.length === 0) {
        return errorResponse(res, 'Menu tidak ditemukan', 404, 'MENU_NOT_FOUND');
    }

    successResponse(res, rows[0], 'Detail menu berhasil diambil');
});

module.exports = {
    getMenu,
    getMenuById
};