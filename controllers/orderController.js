const { asyncHandler, successResponse, errorResponse, Validator } = require('../utils/response');
const pool = require('../config/database');
const NodeCache = require('node-cache');

// Cache configuration
const orderCache = new NodeCache({ 
    stdTTL: parseInt(process.env.ORDER_CACHE_TTL) || 30, 
    checkperiod: 60 
});

// POST /api/order - Buat pesanan baru
const createOrder = asyncHandler(async (req, res) => {
    const { table_number, items } = req.body;

    // Enhanced validation
    const validatedTableNumber = Validator.validateTableNumber(table_number);
    const validatedItems = Validator.validateOrderItems(items);

    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        // Get all prices in one query (safe from SQL injection)
        const menuIds = validatedItems.map(item => item.menu_item_id);
        const placeholders = menuIds.map(() => '?').join(',');
        
        const [menuItems] = await connection.query(
            `SELECT id, price, name FROM menu_items WHERE id IN (${placeholders})`,
            menuIds
        );

        // Create price lookup map
        const priceMap = new Map(menuItems.map(item => [item.id, item.price]));

        // Validate all items exist and calculate total
        let total_amount = 0;
        for (const item of validatedItems) {
            if (!priceMap.has(item.menu_item_id)) {
                await connection.rollback();
                return errorResponse(res, 
                    `Menu item dengan ID ${item.menu_item_id} tidak ditemukan`, 
                    400, 
                    'MENU_ITEM_NOT_FOUND'
                );
            }
            total_amount += priceMap.get(item.menu_item_id) * item.quantity;
        }

        // Insert into orders table
        const [orderResult] = await connection.query(
            'INSERT INTO orders (table_number, total_amount) VALUES (?, ?)',
            [validatedTableNumber, total_amount]
        );

        const orderId = orderResult.insertId;

        // Bulk insert order_items (safe)
        const orderItemsValues = validatedItems.map(item => 
            [orderId, item.menu_item_id, item.quantity]
        );
        
        await connection.query(
            'INSERT INTO order_items (orders_id, menu_item_id, quantity) VALUES ?',
            [orderItemsValues]
        );

        await connection.commit();

        // Clear relevant caches
        orderCache.del('active_orders');

        successResponse(res, {
            order_id: orderId,
            table_number: validatedTableNumber,
            total_amount,
            items_count: validatedItems.length,
            timestamp: new Date().toISOString()
        }, 'Pesanan berhasil dibuat', 201);

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
});

// GET /api/orders - Ambil semua pesanan aktif (belum dibayar)
const getActiveOrders = asyncHandler(async (req, res) => {
    const cacheKey = 'active_orders';
    
    // Try cache first for kitchen display performance
    let cachedData = orderCache.get(cacheKey);
    if (cachedData) {
        return successResponse(res, {
            data: cachedData,
            count: cachedData.length,
            cached: true
        }, 'Pesanan aktif berhasil diambil dari cache');
    }

    // Optimized query with proper indexing
    const query = `
        SELECT 
            o.id as order_id,
            o.table_number,
            o.total_amount,
            o.created_at,
            oi.id as order_item_id,
            oi.status,
            oi.quantity,
            m.name as item_name,
            m.price as item_price,
            m.category
        FROM orders o
        INNER JOIN order_items oi ON o.id = oi.orders_id
        INNER JOIN menu_items m ON oi.menu_item_id = m.id
        WHERE oi.status != 'dibayar'
        ORDER BY 
            CASE oi.status 
                WHEN 'orderan_masuk' THEN 1
                WHEN 'orderan_selesai' THEN 2
                WHEN 'orderan_diantar' THEN 3
            END,
            o.created_at ASC,
            o.id ASC
    `;

    const [rows] = await pool.query(query);

    // Efficient grouping using Map
    const ordersMap = new Map();
    rows.forEach(row => {
        if (!ordersMap.has(row.order_id)) {
            ordersMap.set(row.order_id, {
                order_id: row.order_id,
                table_number: row.table_number,
                total_amount: row.total_amount,
                created_at: row.created_at,
                items: []
            });
        }
        ordersMap.get(row.order_id).items.push({
            order_item_id: row.order_item_id,
            item_name: row.item_name,
            quantity: row.quantity,
            price: row.item_price,
            category: row.category,
            status: row.status
        });
    });

    const orders = Array.from(ordersMap.values());
    
    // Cache for shorter time since orders change frequently
    orderCache.set(cacheKey, orders);

    successResponse(res, {
        data: orders,
        count: orders.length,
        cached: false
    }, 'Pesanan aktif berhasil diambil');
});

// GET /api/order/:id - Ambil detail pesanan berdasarkan ID
const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const orderId = Validator.validateMenuId(id);

    const query = `
        SELECT 
            o.id as order_id,
            o.table_number,
            o.total_amount,
            o.created_at,
            oi.id as order_item_id,
            oi.status,
            oi.quantity,
            m.name as item_name,
            m.price as item_price,
            m.category
        FROM orders o
        JOIN order_items oi ON o.id = oi.orders_id
        JOIN menu_items m ON oi.menu_item_id = m.id
        WHERE o.id = ?
        ORDER BY oi.id ASC
    `;

    const [rows] = await pool.query(query, [orderId]);

    if (rows.length === 0) {
        return errorResponse(res, 'Pesanan tidak ditemukan', 404, 'ORDER_NOT_FOUND');
    }

    const order = {
        order_id: rows[0].order_id,
        table_number: rows[0].table_number,
        total_amount: rows[0].total_amount,
        created_at: rows[0].created_at,
        items: rows.map(row => ({
            order_item_id: row.order_item_id,
            item_name: row.item_name,
            quantity: row.quantity,
            price: row.item_price,
            category: row.category,
            status: row.status
        }))
    };

    successResponse(res, order, 'Detail pesanan berhasil diambil');
});

// PUT /api/order/:orderId/item/:itemId/status - Update status pesanan
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId, itemId } = req.params;
    const { status } = req.body;

    const validatedOrderId = Validator.validateMenuId(orderId);
    const validatedItemId = Validator.validateMenuId(itemId);
    const validatedStatus = Validator.validateStatus(status);

    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        // Update status with optimized query
        const [result] = await connection.query(
            'UPDATE order_items SET status = ? WHERE id = ? AND orders_id = ?',
            [validatedStatus, validatedItemId, validatedOrderId]
        );

        if (result.affectedRows === 0) {
            await connection.rollback();
            return errorResponse(res, 'Item pesanan tidak ditemukan', 404, 'ORDER_ITEM_NOT_FOUND');
        }

        await connection.commit();
        
        // Clear orders cache since status changed
        orderCache.del('active_orders');

        successResponse(res, {
            order_id: validatedOrderId,
            item_id: validatedItemId,
            new_status: validatedStatus,
            timestamp: new Date().toISOString()
        }, 'Status pesanan berhasil diupdate');

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
});

// DELETE /api/order/:id - Hapus pesanan (untuk testing)
const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const orderId = Validator.validateMenuId(id);
    
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        
        const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [orderId]);

        if (result.affectedRows === 0) {
            await connection.rollback();
            return errorResponse(res, 'Pesanan tidak ditemukan', 404, 'ORDER_NOT_FOUND');
        }

        await connection.commit();
        
        // Clear relevant caches
        orderCache.del('active_orders');
        
        successResponse(res, { order_id: orderId }, 'Pesanan berhasil dihapus');

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
});

module.exports = {
    createOrder,
    getActiveOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};