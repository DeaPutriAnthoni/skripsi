const mysql = require('mysql2');

// Simple connection without pooling
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'rich_jane_coffee'
});

console.log('🔧 Memperbaiki 2 menu item...');

// Update Brownies Byts
conn.query(
  "UPDATE menu_items SET image_url = '/images/menu/brownies.jpg' WHERE name = 'Brownies Byts'",
  (err, result) => {
    if (err) {
      console.log('❌ Brownies Byts:', err.message);
    } else {
      console.log(result.affectedRows > 0 ? '✅ Brownies Byts updated' : '⚠️ Brownies Byts not found');
    }
    
    // Update Chicken Katsu + Rice  
    conn.query(
      "UPDATE menu_items SET image_url = '/images/menu/nasi-goreng-chicken-katsu.jpg' WHERE name = 'Chicken Katsu + Rice'",
      (err, result) => {
        if (err) {
          console.log('❌ Chicken Katsu + Rice:', err.message);
        } else {
          console.log(result.affectedRows > 0 ? '✅ Chicken Katsu + Rice updated' : '⚠️ Chicken Katsu + Rice not found');
        }
        
        conn.end();
        console.log('\n✨ Selesai!');
      }
    );
  }
);