const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Static files
app.use(express.static('public'));
app.use(express.json());

// Mock menu data
const menuItems = [
    {id: 1, name: 'Espresso', category: 'minuman', price: 25000, description: 'Kopi espresso', image_url: 'https://via.placeholder.com/400x300'},
    {id: 2, name: 'Cappuccino', category: 'minuman', price: 30000, description: 'Kopi dengan susu', image_url: 'https://via.placeholder.com/400x300'},
    {id: 3, name: 'Croissant', category: 'makanan', price: 35000, description: 'Pastry Prancis', image_url: 'https://via.placeholder.com/400x300'}
];

// Mock orders storage
let orders = [];
let orderIdCounter = 1;

// Menu API
app.get('/api/menu', (req, res) => {
    res.json({
        success: true,
        message: 'Menu berhasil diambil',
        data: {
            data: menuItems
        }
    });
});

// Orders API - GET for kitchen
app.get('/api/orders', (req, res) => {
    res.json({
        success: true,
        message: 'Pesanan berhasil diambil',
        data: {
            data: orders
        }
    });
});

// Orders API - POST for checkout
app.post('/api/orders', (req, res) => {
    console.log('=== ORDER RECEIVED ===');
    console.log('Table:', req.body.table_number);
    console.log('Items:', req.body.items);
    
    const order = {
        order_id: orderIdCounter++,
        table_number: req.body.table_number,
        items: req.body.items.map(item => ({
            ...item,
            name: menuItems.find(m => m.id === item.menu_item_id)?.name || 'Unknown',
            price: menuItems.find(m => m.id === item.menu_item_id)?.price || 0,
            status: 'orderan_masuk'
        })),
        created_at: new Date().toISOString(),
        total_amount: req.body.items.reduce((sum, item) => {
            const menuItem = menuItems.find(m => m.id === item.menu_item_id);
            return sum + (menuItem?.price || 0) * item.quantity;
        }, 0)
    };
    
    orders.push(order);
    
    console.log('Order created:', order.order_id);
    console.log('===================');
    
    res.json({
        success: true,
        message: 'Pesanan berhasil dibuat',
        data: {
            order_id: order.order_id,
            table_number: order.table_number,
            total_amount: order.total_amount,
            items_count: order.items.length
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'System healthy',
        data: {
            status: 'healthy',
            orders_count: orders.length
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SIMPLE SERVER running on http://localhost:${PORT}`);
    console.log(`📱 Menu: http://localhost:${PORT}/menu.html?table=2`);
    console.log(`🍳 Kitchen: http://localhost:${PORT}/kitchen.html`);
    console.log(`✅ ALL TABLES CAN ORDER!`);
});