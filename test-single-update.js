const mysql = require('mysql2');

console.log('🔧 Testing single update...\n');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rich_jane_coffee'
});

// Test update just Brownies Byts first
conn.query(
  "UPDATE menu_items SET image_url = '/images/menu/brownies-byts.jpg' WHERE name = 'Brownies Byts'",
  (err, result) => {
    if (err) {
      console.log('❌ Error:', err.message);
    } else {
      console.log(`✅ Brownies Byts updated: ${result.affectedRows} rows affected`);
      
      // Verify the update
      conn.query(
        "SELECT name, image_url FROM menu_items WHERE name = 'Brownies Byts'",
        (err, rows) => {
          if (err) {
            console.log('❌ Verification error:', err.message);
          } else if (rows.length > 0) {
            console.log(`📸 Current image: ${rows[0].image_url}`);
          }
          
          conn.end();
          console.log('\n✨ Test completed! Please refresh browser (Ctrl+F5)');
        }
      );
    }
  }
);