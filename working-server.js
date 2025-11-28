const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Mock menu data
const menuData = [
  {id: 1, name: 'Cappuccino', category: 'minuman', price: 25000, description: 'Espresso dengan steamed milk foam', image_url: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Cappuccino'},
  {id: 2, name: 'Croissant', category: 'makanan', price: 22000, description: 'Buttery French pastry', image_url: 'https://via.placeholder.com/400x300/FFD700/000000?text=Croissant'},
  {id: 3, name: 'Iced Latte', category: 'minuman', price: 28000, description: 'Espresso dengan cold milk dan ice', image_url: 'https://via.placeholder.com/400x300/87CEEB/FFFFFF?text=Iced+Latte'},
  {id: 4, name: 'Fish n Chips', category: 'makanan', price: 39000, description: 'Ikan goreng crispy dengan kentang goreng', image_url: 'https://via.placeholder.com/400x300/FF6347/FFFFFF?text=Fish+n+Chips'},
  {id: 5, name: 'Vietnam Drip', category: 'minuman', price: 28000, description: 'Kopi Vietnam drip', image_url: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Vietnam+Drip'}
];

let orders = [];
let orderIdCounter = 1;

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    orders_count: orders.length
  });
});

app.get('/api/menu', (req, res) => {
  res.json({
    success: true,
    message: 'Menu berhasil diambil',
    data: { data: menuData }
  });
});

app.post('/api/orders/order', (req, res) => {
  const { table_number, items } = req.body;
  
  let total_amount = 0;
  const orderItems = items.map(item => {
    const menuItem = menuData.find(m => m.id === item.menu_item_id);
    if (!menuItem) return null;
    
    total_amount += menuItem.price * item.quantity;
    return {
      id: orderIdCounter++,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      status: 'orderan_masuk',
      name: menuItem.name,
      price: menuItem.price
    };
  }).filter(item => item !== null);

  const newOrder = {
    order_id: orders.length + 1,
    table_number,
    total_amount,
    created_at: new Date().toISOString(),
    items: orderItems
  };

  orders.push(newOrder);

  res.json({
    success: true,
    message: 'Pesanan berhasil dibuat',
    data: {
      order_id: newOrder.order_id,
      table_number,
      total_amount,
      items_count: items.length,
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/api/orders', (req, res) => {
  const activeOrders = orders.filter(order => 
    order.items.some(item => item.status !== 'dibayar')
  );
  
  res.json({
    success: true,
    message: 'Pesanan aktif berhasil diambil',
    data: {
      data: activeOrders,
      count: activeOrders.length,
      cached: false
    }
  });
});

app.put('/api/orders/:orderId/item/:itemId/status', (req, res) => {
  const { orderId, itemId } = req.params;
  const { status } = req.body;
  
  const order = orders.find(o => o.order_id == orderId);
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Pesanan tidak ditemukan'
    });
  }
  
  const item = order.items.find(i => i.id == itemId);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item pesanan tidak ditemukan'
    });
  }
  
  item.status = status;
  
  res.json({
    success: true,
    message: 'Status pesanan berhasil diupdate',
    data: {
      order_id: parseInt(orderId),
      item_id: parseInt(itemId),
      new_status: status,
      timestamp: new Date().toISOString()
    }
  });
});

// Default route for static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu.html'));
});

// Start server
const server = app.listen(PORT, 'localhost', () => {
  console.log(`🚀 Rich and Jane Coffee Server`);
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`📱 Menu: http://localhost:${PORT}/menu.html?table=1`);
  console.log(`🍳 Kitchen: http://localhost:${PORT}/kitchen.html`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log(`\n✅ Server Ready!`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    server.listen(PORT + 1, 'localhost');
  }
});