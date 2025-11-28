const mysql = require('mysql2');

console.log('🔍 Testing database connection...\n');

// Test basic connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rich_jane_coffee'
});

conn.connect((err) => {
  if (err) {
    console.log('❌ Connection failed:', err.message);
    console.log('\n🔧 Possible solutions:');
    console.log('1. Check if MySQL service is running');
    console.log('2. Verify database exists: rich_jane_coffee');
    console.log('3. Check MySQL credentials');
    console.log('4. Restart MySQL service');
  } else {
    console.log('✅ Connection successful!');
    
    // Test if menu_items table exists
    conn.query('SHOW TABLES', (err, results) => {
      if (err) {
        console.log('❌ Error showing tables:', err.message);
      } else {
        console.log('\n📋 Available tables:');
        results.forEach(row => {
          console.log(`  - ${Object.values(row)[0]}`);
        });
        
        // Test menu_items count
        conn.query('SELECT COUNT(*) as count FROM menu_items', (err, results) => {
          if (err) {
            console.log('❌ Error counting menu_items:', err.message);
          } else {
            console.log(`\n📊 Menu items count: ${results[0].count}`);
          }
          
          conn.end();
        });
      }
    });
  }
});