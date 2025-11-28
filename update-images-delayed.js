const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rich_jane_coffee'
});

console.log('🔧 Updating menu images...\n');

const menuUpdates = [
  { name: 'Brownies Byts', image: '/images/menu/brownies-byts.jpg' },
  { name: 'Katsu Curry Rice', image: '/images/menu/katsu-curry-rice.jpg' },
  { name: 'Chicken Katsu + Rice', image: '/images/menu/chicken-katsu+rice.jpg' },
  { name: 'Croissant Almond Choco', image: '/images/menu/croissant-almond-choco.jpg' },
  { name: 'Croissant Creamcheese Bruleé', image: '/images/menu/croissant-cream-cheese-brulee.jpg' },
  { name: 'Croissant Smoked Beef & Cheese', image: '/images/menu/croissant-smoked-beef-and-cheese.jpg' },
  { name: 'Omellete French Fries', image: '/images/menu/omelette-french-fries.webp' },
  { name: 'Aeropress', image: '/images/menu/aeropress.webp' },
  { name: 'Butterscotch', image: '/images/menu/butterscotch.jpg' },
  { name: 'Caramel Macchiato', image: '/images/menu/caramel-macchiato.webp' },
  { name: 'Kopi Biscoff (Oatside)', image: '/images/menu/kopi-biscoff(oatside).jpeg' },
  { name: 'Kopi Gula Aren (Oatside)', image: '/images/menu/kopi-gula-aren(oatside).jpg' },
  { name: 'Matcha Kyoto', image: '/images/menu/matcha-kyoto.jpg' },
  { name: 'Milkshake Vanilla', image: '/images/menu/milkshake-vanilla.webp' },
  { name: 'English Breakfast', image: '/images/menu/english-breakfast.jpg' },
  { name: 'Salted Caramel (Oatside)', image: '/images/menu/salted-caramel(oatside).jpg' }
];

let completed = 0;
menuUpdates.forEach((menu, index) => {
  setTimeout(() => {
    conn.query(
      'UPDATE menu_items SET image_url = ? WHERE name = ?',
      [menu.image, menu.name],
      (err, result) => {
        if (err) {
          console.log(`❌ ${menu.name}: ${err.message}`);
        } else if (result.affectedRows > 0) {
          console.log(`✅ ${menu.name}`);
          console.log(`   📸 ${menu.image}`);
        } else {
          console.log(`⚠️  Not found: ${menu.name}`);
        }
        
        completed++;
        if (completed === menuUpdates.length) {
          console.log('\n✨ All updates completed! Please refresh browser (Ctrl+F5)');
          conn.end();
        }
      }
    );
  }, index * 200); // 200ms delay between updates
});