const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// Mock data
const menuData = [
  {id: 1, name: 'Cappuccino', category: 'minuman', price: 25000, description: 'Espresso dengan steamed milk foam', image_url: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Cappuccino'},
  {id: 2, name: 'Croissant', category: 'makanan', price: 22000, description: 'Buttery French pastry', image_url: 'https://via.placeholder.com/400x300/FFD700/000000?text=Croissant'},
  {id: 3, name: 'Iced Latte', category: 'minuman', price: 28000, description: 'Espresso dengan cold milk dan ice', image_url: 'https://via.placeholder.com/400x300/87CEEB/FFFFFF?text=Iced+Latte'}
];

let orders = [];

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // API Routes
  if (pathname.startsWith('/api/')) {
    handleAPI(req, res, pathname, url);
    return;
  }

  // Static files
  serveStatic(req, res, pathname);
});

function handleAPI(req, res, pathname, url) {
  // Health check
  if (pathname === '/api/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Menu API
  if (pathname === '/api/menu') {
    console.log('Serving menu API with', menuData.length, 'items');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      success: true,
      message: 'Menu berhasil diambil',
      data: { 
        data: menuData,
        count: menuData.length,
        cached: false
      }
    }));
    return;
  }

  // Orders API
  if (pathname === '/api/orders/order' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const orderData = JSON.parse(body);
        const newOrder = {
          order_id: orders.length + 1,
          table_number: orderData.table_number,
          total_amount: 50000, // Mock total
          created_at: new Date().toISOString(),
          items: orderData.items
        };
        orders.push(newOrder);
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          success: true,
          message: 'Pesanan berhasil dibuat',
          data: {
            order_id: newOrder.order_id,
            table_number: newOrder.table_number,
            total_amount: newOrder.total_amount,
            items_count: newOrder.items.length
          }
        }));
      } catch (error) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          success: false,
          message: 'Invalid JSON'
        }));
      }
    });
    return;
  }

  // Get active orders
  if (pathname === '/api/orders') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      success: true,
      message: 'Pesanan aktif berhasil diambil',
      data: {
        data: orders,
        count: orders.length
      }
    }));
    return;
  }

  // 404 for other API endpoints
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    success: false,
    message: 'API endpoint not found'
  }));
}

function serveStatic(req, res, pathname) {
  // Default to menu.html
  if (pathname === '/') {
    pathname = '/menu.html';
  }

  const filePath = path.join(__dirname, 'public', pathname);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Try menu.html as fallback
        fs.readFile(path.join(__dirname, 'public', 'menu.html'), (err, defaultContent) => {
          if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
          } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(defaultContent);
          }
        });
      } else {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('<h1>500 Server Error</h1>');
      }
    } else {
      // Determine content type
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.js') contentType = 'text/javascript';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.json') contentType = 'application/json';

      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    }
  });
}

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Menu: http://localhost:${PORT}/menu.html?table=1`);
  console.log(`🍳 Kitchen: http://localhost:${PORT}/kitchen.html`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log(`\n✅ Server Ready!`);
});