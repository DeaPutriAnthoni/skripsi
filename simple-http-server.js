const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const PORT = 8080;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // API Routes
  if (pathname.startsWith('/api/')) {
    handleAPI(req, res, parsedUrl);
    return;
  }

  // Static files
  serveStatic(req, res, pathname);
});

function handleAPI(req, res, parsedUrl) {
  const pathname = parsedUrl.pathname;

  // Health check
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Menu API
  if (pathname === '/api/menu') {
    const mockMenu = [
      {id: 1, name: 'Cappuccino', category: 'minuman', price: 25000, description: 'Espresso dengan steamed milk foam', image_url: 'https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Cappuccino'},
      {id: 2, name: 'Croissant', category: 'makanan', price: 22000, description: 'Buttery French pastry', image_url: 'https://via.placeholder.com/400x300/FFD700/000000?text=Croissant'},
      {id: 3, name: 'Iced Latte', category: 'minuman', price: 28000, description: 'Espresso dengan cold milk dan ice', image_url: 'https://via.placeholder.com/400x300/87CEEB/FFFFFF?text=Iced+Latte'}
    ];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: 'Menu berhasil diambil',
      data: { data: mockMenu }
    }));
    return;
  }

  // 404 for other API endpoints
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    message: 'API endpoint not found'
  }));
}

function serveStatic(req, res, pathname) {
  // Default to index.html or menu.html
  if (pathname === '/') {
    pathname = '/menu.html';
  }

  const filePath = path.join(__dirname, 'public', pathname);
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found - try menu.html as default
        fs.readFile(path.join(__dirname, 'public', 'menu.html'), (err, defaultContent) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>File not found</p>');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(defaultContent);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
}

server.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
  console.log(`📱 Menu: http://127.0.0.1:${PORT}/menu.html?table=1`);
  console.log(`🍳 Kitchen: http://127.0.0.1:${PORT}/kitchen.html`);
  console.log(`💚 Health: http://127.0.0.1:${PORT}/api/health`);
  console.log(`\n✅ Server Ready!`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});