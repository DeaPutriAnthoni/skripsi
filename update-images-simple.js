const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function updateImageUrls() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'rich_jane_coffee'
    });

    try {
        console.log('🔧 Updating image URLs to match existing files...\n');

        // Get all image files in the menu folder
        const menuImagePath = path.join(__dirname, 'public', 'images', 'menu');
        const existingFiles = fs.readdirSync(menuImagePath)
            .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
            .sort();

        console.log(`📁 Found ${existingFiles.length} image files:`);
        existingFiles.forEach(file => console.log(`   - ${file}`));
        console.log('');

        // Get all menu items from database
        const [menuItems] = await connection.execute('SELECT id, name, image_url FROM menu_items ORDER BY name');
        console.log(`🍽️ Found ${menuItems.length} menu items in database\n`);

        let updatedCount = 0;
        let skippedCount = 0;

        for (const item of menuItems) {
            // Try to find matching image file
            let matchingFile = null;
            
            // First try exact match
            const exactMatch = existingFiles.find(file => 
                file.toLowerCase() === item.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-') + '.jpg'
            );
            
            if (exactMatch) {
                matchingFile = exactMatch;
            } else {
                // Try fuzzy matching
                const itemName = item.name.toLowerCase();
                matchingFile = existingFiles.find(file => {
                    const fileName = file.toLowerCase().replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
                    return fileName.includes(itemName.split(' ')[0]) || itemName.includes(fileName.split('-')[0]);
                });
            }

            if (matchingFile) {
                const newImageUrl = `/images/menu/${matchingFile}`;
                await connection.execute(
                    'UPDATE menu_items SET image_url = ? WHERE id = ?',
                    [newImageUrl, item.id]
                );
                console.log(`✅ Updated: ${item.name} → ${matchingFile}`);
                updatedCount++;
            } else {
                // For items without matching files, use a generic placeholder or keep external URL
                if (item.image_url.startsWith('https://images.unsplash.com')) {
                    console.log(`🌐 Kept external: ${item.name}`);
                } else {
                    // Set to a default local image if available
                    const defaultImage = existingFiles.find(file => file.includes('coffee') || file.includes('menu'));
                    if (defaultImage) {
                        await connection.execute(
                            'UPDATE menu_items SET image_url = ? WHERE id = ?',
                            [`/images/menu/${defaultImage}`, item.id]
                        );
                        console.log(`🔄 Set default: ${item.name} → ${defaultImage}`);
                        updatedCount++;
                    } else {
                        console.log(`⚠️  No match: ${item.name}`);
                    }
                }
                skippedCount++;
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`✅ Successfully updated: ${updatedCount} items`);
        console.log(`⚠️  Skipped/kept external: ${skippedCount} items`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.end();
        console.log('\n🎉 Image URL update completed!');
    }
}

updateImageUrls();