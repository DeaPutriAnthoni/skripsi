require('dotenv').config();
const { app, PORT } = require('./config/middleware');
const { errorHandler } = require('./utils/response');

// Import Routes
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const qrRoutes = require('./routes/qrRoutes');
const systemRoutes = require('./routes/systemRoutes');

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes); // orders endpoints
app.use('/api/qrcode', qrRoutes);
app.use('/api/system', systemRoutes); // system endpoints

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Rich and Jane Coffee API',
        version: '1.0.0',
        description: 'Sistem Pemesanan Menu Digital Berbasis QR Code',
        endpoints: {
            menu: {
                list: 'GET /api/menu',
                detail: 'GET /api/menu/:id'
            },
            orders: {
                create: 'POST /api/orders/order',
                list: 'GET /api/orders/',
                detail: 'GET /api/orders/:id',
                updateStatus: 'PUT /api/orders/:orderId/item/:itemId/status',
                delete: 'DELETE /api/orders/:id'
            },
            qr: {
                generate: 'GET /api/qrcode/:table'
            },
            system: {
                health: 'GET /api/system/health',
                stats: 'GET /api/system/stats',
                clearCache: 'POST /api/system/cache/clear'
            }
        },
        documentation: '/api/docs',
        health: '/api/system/health'
    });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
    res.json({
        success: true,
        message: 'Rich and Jane Coffee API Documentation',
        version: '1.0.0',
        baseUrl: `${req.protocol}://${req.get('host')}/api`,
        authentication: 'None (for development)',
        rateLimit: {
            window: '15 minutes',
            max: '100 requests per IP'
        },
        endpoints: {
            menu: {
                'GET /menu': 'Get all menu items with optional category filter',
                'GET /menu/:id': 'Get specific menu item by ID'
            },
            orders: {
                'POST /order': 'Create new order',
                'GET /orders': 'Get all active orders (kitchen display)',
                'GET /order/:id': 'Get order details by ID',
                'PUT /order/:orderId/item/:itemId/status': 'Update order item status',
                'DELETE /order/:id': 'Delete order (testing only)'
            },
            qr: {
                'GET /qrcode/:table': 'Generate QR code for specific table'
            },
            system: {
                'GET /health': 'System health check',
                'GET /stats': 'System statistics',
                'POST /cache/clear': 'Clear application cache'
            }
        },
        statusCodes: {
            200: 'Success',
            201: 'Created',
            400: 'Bad Request',
            404: 'Not Found',
            409: 'Conflict',
            429: 'Too Many Requests',
            500: 'Internal Server Error',
            503: 'Service Unavailable'
        },
        examples: {
            createOrder: {
                method: 'POST',
                url: '/api/order',
                body: {
                    table_number: 1,
                    items: [
                        { menu_item_id: 1, quantity: 2 },
                        { menu_item_id: 5, quantity: 1 }
                    ]
                }
            },
            updateStatus: {
                method: 'PUT',
                url: '/api/order/1/item/1/status',
                body: {
                    status: 'orderan_selesai'
                }
            }
        }
    });
});

// 404 Handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan',
        code: 'NOT_FOUND',
        availableEndpoints: '/api/docs'
    });
});

// Error Handling Middleware (must be last)
app.use(errorHandler);

// Graceful Shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

// Start server
const REAL_PORT = process.env.PORT || PORT || 8080;
app.listen(REAL_PORT, () => {
const baseUrl = process.env.RAILWAY_PUBLIC_DOMAIN
    ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
    : `http://localhost:${REAL_PORT}`;

    console.log(`\n🚀 Rich and Jane Coffee API Server`);
    console.log(`📍 Server running on ${baseUrl}`);
    console.log(`📱 Menu Display: ${baseUrl}/menu.html?table=1`);
    console.log(`🍳 Kitchen Display: ${baseUrl}/kitchen.html`);
    console.log(`📋 QR Generator: ${baseUrl}/qrcode.html`);
    console.log(`📚 API Documentation: ${baseUrl}/api/docs`);
    console.log(`💚 Health Check: ${baseUrl}/api/system/health`);
    console.log(`\n⚡ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔧 Database: ${process.env.MYSQLDATABASE}`);
    console.log(`📊 Cache TTL: Menu=${process.env.MENU_CACHE_TTL || 300}s, Orders=${process.env.ORDER_CACHE_TTL || 30}s`);
    console.log(`\n✨ Server is ready to accept requests!\n`);
});