const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Static files
app.use(express.static('public'));

// Simple API
app.get('/api/menu', (req, res) => {
    res.json({
        success: true,
        message: 'Menu berhasil diambil',
        data: {
            data: [
                {id: 1, name: 'Espresso', category: 'minuman', price: 25000, description: 'Kopi espresso klasik', image_url: 'https://via.placeholder.com/400x300'},
                {id: 2, name: 'Cappuccino', category: 'minuman', price: 30000, description: 'Kopi dengan susu foam', image_url: 'https://via.placeholder.com/400x300'},
                {id: 3, name: 'Croissant', category: 'makanan', price: 35000, description: 'Pastry buttery Prancis', image_url: 'https://via.placeholder.com/400x300'},
                {id: 4, name: 'Sandwich', category: 'makanan', price: 45000, description: 'Sandwich dengan sayuran segar', image_url: 'https://via.placeholder.com/400x300'}
            ]
        }
    });
});

// Order API
app.post('/api/orders', (req, res) => {
    console.log('Order received:', req.body);
    const orderId = Math.floor(Math.random() * 1000) + 1;
    res.json({
        success: true,
        message: 'Pesanan berhasil dibuat',
        data: {
            order_id: orderId,
            table_number: req.body.table_number,
            total_amount: 75000,
            items_count: req.body.items.length,
            timestamp: new Date().toISOString()
        }
    });
});

// Start server
app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Simple server running on http://127.0.0.1:${PORT}`);
    console.log(`📱 Menu: http://127.0.0.1:${PORT}/menu.html?table=1`);
    console.log(`🍳 Kitchen: http://127.0.0.1:${PORT}/kitchen.html`);
});