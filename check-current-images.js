const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rich_jane_coffee'
});

console.log('🔍 Checking current image URLs...\n');

// Check Brownies Byts
conn.query(
  'SELECT name, image_url FROM menu_items WHERE name IN ("Brownies Byts", "Chicken Katsu + Rice")',
  (err, results) => {
    if (err) {
      console.log('❌ Error:', err.message);
    } else {
      results.forEach(item => {
        console.log(`📋 ${item.name}`);
        console.log(`🖼️  Current: ${item.image_url}`);
        
        if (item.name === 'Brownies Byts') {
          console.log(`🎯 Should be: /images/menu/brownies.jpg`);
          console.log(`✅ Match: ${item.image_url === '/images/menu/brownies.jpg' ? 'YES' : 'NO'}`);
        } else if (item.name === 'Chicken Katsu + Rice') {
          console.log(`🎯 Should be: /images/menu/nasi-goreng-chicken-katsu.jpg`);
          console.log(`✅ Match: ${item.image_url === '/images/menu/nasi-goreng-chicken-katsu.jpg' ? 'YES' : 'NO'}`);
        }
        console.log('');
      });
    }
    
    conn.end();
  }
);