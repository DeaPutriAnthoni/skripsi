const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function revertToExternalForMissingImages() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'rich_jane_coffee'
    });

    try {
        console.log('🔄 Reverting menus with no matching images to external URLs...\n');

        // Get all image files in menu folder
        const menuImagePath = path.join(__dirname, 'public', 'images', 'menu');
        const existingFiles = fs.readdirSync(menuImagePath)
            .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
            .map(file => file.toLowerCase())
            .sort();

        console.log(`📁 Available image files (${existingFiles.length}):`);
        existingFiles.forEach(file => console.log(`   - ${file}`));
        console.log('');

        // Get all menu items from database
        const [menuItems] = await connection.execute('SELECT id, name, image_url FROM menu_items ORDER BY name');
        console.log(`🍽️ Checking ${menuItems.length} menu items...\n`);

        // External image mapping for items without local images
        const externalImageMapping = {
            // MAKANAN - STARTER
            'French Fries (Mozzarella)': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
            'French Fries (No Mozzarella)': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
            'Onion Ring': 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400',
            
            // PASTRY - CROISSANT SERIES
            'Croissant Almond Choco': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
            'Croissant Smoked Beef & Cheese': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
            'Croissant Creamcheese Bruleé': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
            
            // SWEET TREATS
            'Brownies Byts': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
            'Cookies': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
            'Classic Tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
            
            // MAIN COURSE - WESTERN
            'Spaghetti Aglio Olio': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
            
            // MAIN COURSE - ASIAN CUISINE
            'Nasi Jeruk Kulit Crispy': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
            'Mie Goreng Khas RJ': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
            'Katsu Curry Rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
            
            // BREAKFAST
            'Omellete French Fries': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
            
            // KIDS MEAL
            'Chicken Katsu + Rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
            'Fish n Chips (Kids)': 'https://images.unsplash.com/photo-1580217593608-61931cefc821?w=400',
            
            // COFFEE - MANUAL BREW ARABICA BEAN
            'Aeropress': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
            
            // COFFEE - BLACK (hot/ice)
            'Americano': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
            
            // COFFEE - WHITE (hot/ice)
            'Cappuccino': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
            'Flat White': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
            'Vietnamese Iced Coffee': 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
            
            // COFFEE - LATTE (hot/ice)
            'Butterscotch': 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400',
            'Caramel Macchiato': 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400',
            
            // COFFEE - ADDITIONAL
            'Oat Milk': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
            'Espresso Shot': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
            
            // COFFEE - MANMADE (hot/ice)
            'Kopi Cheesecake': 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
            'Cocoberry Americano': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
            'Coffee Cream': 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400',
            'Matcha Kyoto': 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
            
            // COFFEE - OATSIDE SERIES
            'Kopi Gula Aren (Oatside)': 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
            'Kopi Cheesecake (Oatside)': 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
            'Kopi Biscoff (Oatside)': 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400',
            'Salted Caramel (Oatside)': 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400',
            
            // NON COFFEE
            'Squash Lemon': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
            'Squash Orange': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
            'Milkshake Chocolate': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',
            'Milkshake Vanilla': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',
            
            // TEA
            'English Breakfast': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
            'Peppermint Infusion': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'
        };

        let keptLocalCount = 0;
        let revertedToExternalCount = 0;

        for (const item of menuItems) {
            const externalUrl = externalImageMapping[item.name];
            
            if (externalUrl) {
                // Update to external URL
                await connection.execute(
                    'UPDATE menu_items SET image_url = ? WHERE id = ?',
                    [externalUrl, item.id]
                );
                console.log(`🌐 Reverted to external: ${item.name}`);
                revertedToExternalCount++;
            } else {
                // Keep local image
                console.log(`📁 Kept local: ${item.name} → ${item.image_url}`);
                keptLocalCount++;
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`📁 Kept local images: ${keptLocalCount} items`);
        console.log(`🌐 Reverted to external: ${revertedToExternalCount} items`);
        console.log(`📈 Total items: ${keptLocalCount + revertedToExternalCount} items`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.end();
        console.log('\n🎉 Image URL reversion completed!');
    }
}

revertToExternalForMissingImages();