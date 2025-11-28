const mysql = require('mysql2/promise');
require('dotenv').config();

// ✅ DATABASE CONNECTION POOL (RAILWAY PRODUCTION SAFE)
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // WAJIB dari Railway
    user: process.env.DB_USER,
    password: process.env.DB_PASS,  // ✅ PAKAI DB_PASS
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,      // ✅ WAJIB ADA
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

// ✅ TEST CONNECTION
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Database connected successfully (Railway)');
    connection.release();
  } catch (err) {
    console.error('✗ Database connection failed:', err.message);
    process.exit(1); // ⛔ Hentikan server jika DB gagal
  }
})();

module.exports = pool;
