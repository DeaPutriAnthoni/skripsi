const mysql = require('mysql2');

// Use connection with different settings to avoid locks
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rich_jane_coffee',
  multipleStatements: true
});

console.log('🔧 Force updating 2 menu items...\n');

const sql = `
  UPDATE menu_items SET image_url = '/images/menu/brownies.jpg' WHERE name = 'Brownies Byts';
  UPDATE menu_items SET image_url = '/images/menu/nasi-goreng-chicken-katsu.jpg' WHERE name = 'Chicken Katsu + Rice';
`;

conn.query(sql, (err, results) => {
  if (err) {
    console.log('❌ Error:', err.message);
  } else {
    console.log('✅ Updates executed');
    console.log('📊 Result:', results);
  }
  
  // Verify the updates
  conn.query(
    'SELECT name, image_url FROM menu_items WHERE name IN ("Brownies Byts", "Chicken Katsu + Rice")',
    (err, results) => {
      if (err) {
        console.log('❌ Verification error:', err.message);
      } else {
        console.log('\n🔍 Verification:');
        results.forEach(item => {
          console.log(`✅ ${item.name}: ${item.image_url}`);
        });
      }
      
      conn.end();
      console.log('\n✨ Done! Please refresh your browser (Ctrl+F5)');
    }
  );
});