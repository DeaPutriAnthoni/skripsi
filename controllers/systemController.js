const { asyncHandler, successResponse } = require('../utils/response');
const pool = require('../config/database');
const NodeCache = require('node-cache');

// Cache instances
const menuCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });
const orderCache = new NodeCache({ stdTTL: 30, checkperiod: 60 });

// GET /api/health - Health check endpoint
const healthCheck = asyncHandler(async (req, res) => {
    const start = Date.now();
    
    try {
        // Test database connection
        await pool.query('SELECT 1');
        const responseTime = Date.now() - start;
        
        successResponse(res, {
            status: 'healthy',
            responseTime: `${responseTime}ms`,
            cache: {
                menu: menuCache.getStats(),
                orders: orderCache.getStats()
            },
            database: 'connected',
            timestamp: new Date().toISOString()
        }, 'System health check passed');
        
    } catch (error) {
        const responseTime = Date.now() - start;
        
        res.status(503).json({
            success: false,
            status: 'unhealthy',
            responseTime: `${responseTime}ms`,
            database: 'disconnected',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// POST /api/cache/clear - Clear cache endpoints (for admin)
const clearCache = asyncHandler(async (req, res) => {
    const { type } = req.body;
    
    try {
        if (type === 'menu') {
            menuCache.flushAll();
        } else if (type === 'orders') {
            orderCache.flushAll();
        } else {
            menuCache.flushAll();
            orderCache.flushAll();
        }
        
        successResponse(res, { 
            cleared: type || 'all',
            timestamp: new Date().toISOString()
        }, 'Cache cleared successfully');
        
    } catch (error) {
        throw error;
    }
});

// GET /api/stats - System statistics
const getSystemStats = asyncHandler(async (req, res) => {
    try {
        // Get database stats
        const [menuStats] = await pool.query('SELECT COUNT(*) as total_items FROM menu_items');
        const [orderStats] = await pool.query('SELECT COUNT(*) as total_orders FROM orders');
        const [activeOrderStats] = await pool.query(`
            SELECT COUNT(*) as active_orders 
            FROM orders o 
            WHERE EXISTS (
                SELECT 1 FROM order_items oi 
                WHERE oi.orders_id = o.id AND oi.status != 'dibayar'
            )
        `);
        
        successResponse(res, {
            database: {
                total_menu_items: menuStats[0].total_items,
                total_orders: orderStats[0].total_orders,
                active_orders: activeOrderStats[0].active_orders
            },
            cache: {
                menu: menuCache.getStats(),
                orders: orderCache.getStats()
            },
            system: {
                uptime: process.uptime(),
                memory_usage: process.memoryUsage(),
                node_version: process.version
            },
            timestamp: new Date().toISOString()
        }, 'System statistics retrieved successfully');
        
    } catch (error) {
        throw error;
    }
});

module.exports = {
    healthCheck,
    clearCache,
    getSystemStats
};