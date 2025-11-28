const mysql = require('mysql2/promise');
require('dotenv').config();

// Database Connection Pool - Secure Configuration
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rich_jane_coffee',
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 20,
    queueLimit: 0,
    charset: 'utf8mb4'
});

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log('✓ Database connected successfully');
        connection.release();
    })
    .catch(err => {
        console.error('✗ Database connection failed:', err.message);
        console.log('⚠️  Server continuing without database for testing...');
        // Don't exit, continue without database
    });

module.exports = pool;