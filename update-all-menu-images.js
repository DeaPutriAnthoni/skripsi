const mysql = require('mysql2/promise');

async function updateMenuImages() {
  let conn;
  try {
    conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'rich_jane_coffee'
    });
    
    console.log('🔧 Updating menu images...\n');
    
    // Mapping menu items to their correct image files
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
    
    let successCount = 0;
    let notFoundCount = 0;
    
    for (const menu of menuUpdates) {
      try {
        const [result] = await conn.execute(
          'UPDATE menu_items SET image_url = ? WHERE name = ?',
          [menu.image, menu.name]
        );
        
        if (result.affectedRows > 0) {
          console.log(`✅ ${menu.name}`);
          console.log(`   📸 ${menu.image}`);
          successCount++;
        } else {
          console.log(`⚠️  Not found: ${menu.name}`);
          notFoundCount++;
        }
      } catch (error) {
        console.log(`❌ Error updating ${menu.name}: ${error.message}`);
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully updated: ${successCount} items`);
    console.log(`⚠️  Not found: ${notFoundCount} items`);
    
    // Verify some updates
    console.log(`\n🔍 Verification:`);
    const sampleMenus = ['Brownies Byts', 'Chicken Katsu + Rice', 'Croissant Almond Choco'];
    for (const menuName of sampleMenus) {
      const [rows] = await conn.execute(
        'SELECT name, image_url FROM menu_items WHERE name = ?',
        [menuName]
      );
      if (rows.length > 0) {
        console.log(`✅ ${rows[0].name}: ${rows[0].image_url}`);
      }
    }
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
  } finally {
    if (conn) await conn.end();
    console.log('\n✨ Done! Please refresh your browser (Ctrl+F5)');
  }
}

updateMenuImages();