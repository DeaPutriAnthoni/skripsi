const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false }
});

pool.getConnection()
    .then(conn => {
        console.log('✅ DATABASE CONNECTED TO RAILWAY');
        conn.release();
    })
    .catch(err => {
        console.error('❌ DATABASE ERROR:', err.message);
    });

module.exports = pool;
