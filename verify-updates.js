const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rich_jane_coffee'
});

console.log('🔍 Verifying menu image updates...\n');

const checkMenus = [
  'Brownies Byts',
  'Chicken Katsu + Rice', 
  'Croissant Almond Choco',
  'Kopi Biscoff (Oatside)',
  'Matcha Kyoto'
];

let checked = 0;

checkMenus.forEach(menuName => {
  conn.query(
    'SELECT name, image_url FROM menu_items WHERE name = ?',
    [menuName],
    (err, results) => {
      if (err) {
        console.log(`❌ Error checking ${menuName}: ${err.message}`);
      } else if (results.length > 0) {
        const item = results[0];
        console.log(`✅ ${item.name}`);
        console.log(`   📸 ${item.image_url}`);
      } else {
        console.log(`⚠️  Not found: ${menuName}`);
      }
      
      checked++;
      if (checked === checkMenus.length) {
        conn.end();
        console.log('\n✨ Verification completed!');
        console.log('🔄 Please refresh your browser (Ctrl+F5) to see the new images');
      }
    }
  );
});