const express = require('express');
const { 
    createOrder, 
    getActiveOrders, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder 
} = require('../controllers/orderController');

const router = express.Router();

// POST /api/orders - Buat pesanan baru
router.post('/', createOrder);

// GET /api/orders - Ambil semua pesanan aktif (belum dibayar)
router.get('/', getActiveOrders);

// GET /api/order/:id - Ambil detail pesanan berdasarkan ID
router.get('/:id', getOrderById);

// PUT /api/order/:orderId/item/:itemId/status - Update status pesanan
router.put('/:orderId/item/:itemId/status', updateOrderStatus);

// DELETE /api/order/:id - Hapus pesanan (untuk testing)
router.delete('/:id', deleteOrder);

module.exports = router;