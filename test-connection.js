const http = require('http');

const PORT = 8080;

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    console.log('CORS preflight request');
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Simple response for testing
  if (req.url === '/api/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({success: true, message: 'Server is running!'}));
    return;
  }
  
  if (req.url === '/api/menu') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      success: true,
      message: 'Menu loaded',
      data: { 
        data: [
          {id: 1, name: 'Cappuccino', category: 'minuman', price: 25000, description: 'Espresso dengan steamed milk foam'},
          {id: 2, name: 'Croissant', category: 'makanan', price: 22000, description: 'Buttery French pastry'}
        ]
      }
    }));
    return;
  }
  
  // Order API
  if (req.url === '/api/orders/order' && req.method === 'POST') {
    console.log('🛒 ORDER API CALLED - Processing order...');
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const orderData = JSON.parse(body);
        console.log('Order received:', orderData);
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          success: true,
          message: 'Pesanan berhasil dibuat',
          data: {
            order_id: Math.floor(Math.random() * 1000) + 1,
            table_number: orderData.table_number,
            total_amount: 75000,
            items_count: orderData.items.length,
            timestamp: new Date().toISOString()
          }
        }));
      } catch (error) {
        console.log('Order error:', error);
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          success: false,
          message: 'Invalid order data'
        }));
      }
    });
    return;
  }
  
  // Get active orders for kitchen
  if (req.url === '/api/orders') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      success: true,
      message: 'Pesanan aktif berhasil diambil',
      data: {
        data: [
          {
            order_id: 1,
            table_number: 1,
            total_amount: 75000,
            created_at: new Date().toISOString(),
            items: [
              {order_item_id: 1, item_name: 'Cappuccino', quantity: 2, price: 25000, status: 'orderan_masuk'},
              {order_item_id: 2, item_name: 'Croissant', quantity: 1, price: 22000, status: 'orderan_masuk'}
            ]
          }
        ],
        count: 1,
        cached: false
      }
    }));
    return;
  }
  
  // Update order status
  if (req.url.match(/\/api\/orders\/\d+\/item\/\d+\/status/) && req.method === 'PUT') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      success: true,
      message: 'Status pesanan berhasil diupdate',
      data: {
        order_id: 1,
        item_id: 1,
        new_status: 'orderan_selesai',
        timestamp: new Date().toISOString()
      }
    }));
    return;
  }
  
  // QR Code API
  if (req.url.match(/\/api\/qrcode\/\d+/)) {
    const tableNumber = req.url.split('/').pop();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      success: true,
      message: 'QR Code berhasil digenerate',
      data: {
        table_number: parseInt(tableNumber),
        qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        url: `http://localhost:${PORT}/menu.html?table=${tableNumber}`
      }
    }));
    return;
  }
  
  // Default response
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <html>
    <head><title>Rich and Jane Coffee Server</title></head>
    <body>
      <h1>🚀 Rich and Jane Coffee Server</h1>
      <p>Port: ${PORT}</p>
      <p>Time: ${new Date().toLocaleString()}</p>
      <h2>API Endpoints:</h2>
      <ul>
        <li><a href="/api/health">Health Check</a></li>
        <li><a href="/api/menu">Menu API</a></li>
        <li><a href="/api/orders">Active Orders</a></li>
        <li><a href="/api/qrcode/1">QR Code Table 1</a></li>
        <li><a href="/api/qrcode/2">QR Code Table 2</a></li>
      </ul>
      <h2>Pages:</h2>
      <ul>
        <li><a href="/menu.html?table=1">Menu Table 1</a></li>
        <li><a href="/menu.html?table=2">Menu Table 2</a></li>
        <li><a href="/kitchen.html">Kitchen Display</a></li>
        <li><a href="/qrcode.html">QR Generator</a></li>
      </ul>
    </body>
    </html>
  `);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server STARTED on http://localhost:${PORT}`);
  console.log(`📱 Test: http://localhost:${PORT}`);
  console.log(`🍳 Kitchen: http://localhost:${PORT}/kitchen.html`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log(`\n✅ Server is RUNNING! Keep this window open.`);
});

server.on('error', (err) => {
  console.error('❌ Server Error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy. Trying ${PORT + 1}...`);
    server.listen(PORT + 1, '0.0.0.0');
  }
});