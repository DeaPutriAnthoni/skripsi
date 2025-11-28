const mysql = require('mysql2');

async function updateWithRetry() {
  let attempts = 0;
  const maxAttempts = 5;
  
  while (attempts < maxAttempts) {
    try {
      console.log(`🔄 Attempt ${attempts + 1}/${maxAttempts}...`);
      
      const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'rich_jane_coffee'
      });
      
      // Update Brownies Byts
      await conn.execute(
        'UPDATE menu_items SET image_url = ? WHERE name = ?',
        ['/images/menu/brownies.jpg', 'Brownies Byts']
      );
      console.log('✅ Brownies Byts updated');
      
      // Update Chicken Katsu + Rice
      await conn.execute(
        'UPDATE menu_items SET image_url = ? WHERE name = ?',
        ['/images/menu/nasi-goreng-chicken-katsu.jpg', 'Chicken Katsu + Rice']
      );
      console.log('✅ Chicken Katsu + Rice updated');
      
      // Verify
      const [rows] = await conn.execute(
        'SELECT name, image_url FROM menu_items WHERE name IN (?, ?)',
        ['Brownies Byts', 'Chicken Katsu + Rice']
      );
      
      console.log('\n🔍 Verification:');
      rows.forEach(row => {
        console.log(`✅ ${row.name}: ${row.image_url}`);
      });
      
      await conn.end();
      console.log('\n✨ Success! Please refresh browser (Ctrl+F5)');
      return;
      
    } catch (error) {
      attempts++;
      console.log(`❌ Attempt ${attempts} failed: ${error.message}`);
      
      if (attempts < maxAttempts) {
        console.log(`⏳ Waiting 3 seconds before retry...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }
  
  console.log('❌ All attempts failed. Please try manual SQL execution.');
}

updateWithRetry();