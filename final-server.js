const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Simple menu data
const menuData = [
  {id: 1, name: 'Cappuccino', category: 'minuman', price: 25000, description: 'Espresso dengan steamed milk foam'},
  {id: 2, name: 'Croissant', category: 'makanan', price: 22000, description: 'Buttery French pastry'},
  {id: 3, name: 'Iced Latte', category: 'minuman', price: 28000, description: 'Espresso dengan cold milk dan ice'}
];

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = req.url;

  // API Routes
  if (url.startsWith('/api/')) {
    if (url === '/api/health') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({success: true, message: 'Server is running'}));
      return;
    }

    if (url === '/api/menu') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        success: true,
        message: 'Menu berhasil diambil',
        data: { data: menuData }
      }));
      return;
    }

    if (url === '/api/orders') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        success: true,
        message: 'Orders retrieved',
        data: { data: [] }
      }));
      return;
    }

    if (url === '/api/orders/order' && req.method === 'POST') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        success: true,
        message: 'Order created',
        data: { order_id: 1, table_number: 1, total_amount: 50000 }
      }));
      return;
    }

    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({success: false, message: 'API not found'}));
    return;
  }

  // Static files
  let filePath = path.join(__dirname, 'public', url === '/' ? 'menu.html' : url);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Fallback to menu.html
      fs.readFile(path.join(__dirname, 'public', 'menu.html'), (fallbackErr, fallbackContent) => {
        if (fallbackErr) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end('<h1>404 Not Found</h1>');
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(fallbackContent);
        }
      });
    } else {
      const ext = path.extname(filePath);
      const contentType = ext === '.css' ? 'text/css' : 
                        ext === '.js' ? 'text/javascript' : 'text/html';
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Menu: http://localhost:${PORT}/menu.html?table=1`);
  console.log(`🍳 Kitchen: http://localhost:${PORT}/kitchen.html`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health`);
  console.log(`\n✅ Server Ready!`);
});