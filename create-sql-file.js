// Try a different approach - use raw SQL file
const fs = require('fs');

const sql = `
-- Fix Brownies Byts
UPDATE menu_items SET image_url = '/images/menu/brownies.jpg' WHERE name = 'Brownies Byts';

-- Fix Chicken Katsu + Rice  
UPDATE menu_items SET image_url = '/images/menu/nasi-goreng-chicken-katsu.jpg' WHERE name = 'Chicken Katsu + Rice';

-- Show results
SELECT name, image_url FROM menu_items WHERE name IN ('Brownies Byts', 'Chicken Katsu + Rice');
`;

fs.writeFileSync('fix-images.sql', sql);
console.log('✅ Created fix-images.sql file');
console.log('📝 Please run this command in MySQL:');
console.log('mysql -u root rich_jane_coffee < fix-images.sql');