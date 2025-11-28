const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function updateImageUrlsAccurately() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'rich_jane_coffee'
    });

    try {
        console.log('🎯 Accurately matching menu names with existing image files...\n');

        // Get all image files in menu folder
        const menuImagePath = path.join(__dirname, 'public', 'images', 'menu');
        const existingFiles = fs.readdirSync(menuImagePath)
            .filter(file => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
            .sort();

        console.log(`📁 Available image files (${existingFiles.length}):`);
        existingFiles.forEach(file => console.log(`   - ${file}`));
        console.log('');

        // Get all menu items from database
        const [menuItems] = await connection.execute('SELECT id, name, image_url FROM menu_items ORDER BY name');
        console.log(`🍽️ Menu items in database (${menuItems.length}):\n`);

        // Create accurate mapping based on existing files only
        const accurateMapping = {
            // MAKANAN - STARTER
            'Fish n Chips': 'fish-and-chips.jpg',
            'French Fries (Mozzarella)': 'mix-platter.jpg', // Using mix-platter as placeholder
            'French Fries (No Mozzarella)': 'mix-platter.jpg', // Using mix-platter as placeholder
            'Mix Platter': 'mix-platter.jpg',
            'Tahu Cabe Garam': 'tahu-cabe-garam.jpg',
            'Singkong Goreng Original': 'singkong-goreng.jpg',
            'Singkong Goreng Keju': 'singkong-goreng-keju.webp',
            'Kulit Cabe Garam': 'kulit-cabe-garam.jpg',
            'Cireng Bumbu Rujak': 'cireng-bumbu-rujak.jpg',
            'Chicken Pop Saos Thailand': 'chicken-pop-saos-thailand.jpg',
            'Onion Ring': 'mix-platter.jpg', // Using mix-platter as placeholder
            'Calamary': 'calamary.avif',
            
            // PASTRY - CROISSANT SERIES
            'Almond Croissant': 'almond-croissant.jpg',
            'Butter Croissant': 'butter-croissant.jpg',
            'Pain au Chocolate Croissant': 'pain-au-chocolate.jpg',
            'Croissant Almond Choco': 'almond-croissant.jpg', // Using almond-croissant
            'Croissant Strawberry Supreme': 'croissant-strawberry-supreme.avif',
            'Croissant Creamcheese Bruleé': 'croissant-cream-cheese-brulee.jpg',
            'Croissant Cheese Madness': 'croissant-cheese-madness.jpg',
            'Croissant Smoked Beef & Cheese': 'croissant-smoked-beef-and-cheese.jpg',
            'Cookies Croissant': 'cookies-croissant.jpg',
            
            // SWEET TREATS
            'Basque Burnt Cheese Cake': 'basque-cheesecake.jpg',
            'Brownies': 'brownies.jpg',
            'Brownies Byts': 'brownies.jpg', // Same as brownies
            'Cookies': 'chocolate.jpg', // Using chocolate as placeholder
            'Pistachio Kunafa Brownies': 'pistachio-kunafa-brownies.png',
            'Classic Tiramisu': 'basque-cheesecake.jpg', // Using basque as placeholder
            
            // MAIN COURSE - WESTERN
            'Spaghetti Aglio Olio': 'spaghetti-bolognese.jpg', // Using spaghetti-bolognese
            'Spaghetti Bolognese': 'spaghetti-bolognese.jpg',
            'Chicken Cordon Bleu': 'chicken-cordon-bleu.webp',
            
            // MAIN COURSE - ASIAN CUISINE
            'Chicken Salted Egg': 'chicken-salted-egg.jpg',
            'Nasi Jeruk Kulit Crispy': 'chicken-salted-egg.jpg', // Using chicken-salted-egg as placeholder
            'Nasi Sapi Sambal Matah': 'nasi-sapi-sambal-matah.jpg',
            'Mie Goreng Khas RJ': 'nasi-gila.jpg', // Using nasi-gila as placeholder
            'Nasi Chicken Mozarella': 'nasi-chicken-mozzarella.jpg',
            'Nasi Goreng Chicken Katsu': 'nasi-goreng-chicken-katsu.jpg',
            'Nasi Goreng Tomyam Seafood': 'nasi-goreng-seafood.jpg',
            'Nasi Gila': 'nasi-gila.jpg',
            'Nasi Beef Teriyaki': 'nasi-beef-teriyaki.jpg',
            'Katsu Curry Rice': 'nasi-goreng-chicken-katsu.jpg', // Using chicken-katsu
            
            // BREAKFAST
            'Omellete French Fries': 'omelette-french-fries.webp',
            'Mushroom Croissant': 'mushroom-croissant.webp',
            
            // KIDS MEAL
            'Chicken Katsu + Rice': 'nasi-goreng-chicken-katsu.jpg',
            'Fish n Chips (Kids)': 'fish-and-chips.jpg',
            
            // COFFEE - MANUAL BREW ARABICA BEAN
            'Vietnam Drip': 'vietnam-drip.webp',
            'V60': 'v60.webp',
            'French Press': 'french-press.webp',
            'Syphon': 'syphon.jpg',
            'Aeropress': 'french-press.webp', // Using french-press as placeholder
            'Japanese': 'japanese.webp',
            
            // COFFEE - BLACK (hot/ice)
            'Americano': 'long-black.jpg', // Using long-black as placeholder
            'Long Black': 'long-black.jpg',
            
            // COFFEE - WHITE (hot/ice)
            'Cappuccino': 'caffe-latte.jpg', // Using caffe-latte as placeholder
            'Flat White': 'caffe-latte.jpg', // Using caffe-latte as placeholder
            'Vietnamese Iced Coffee': 'vietnam-drip.webp',
            
            // COFFEE - LATTE (hot/ice)
            'Caffe Latte': 'caffe-latte.jpg',
            'Caramel Latte': 'caramel-latte.jpg',
            'Butterscotch': 'butterscotch-creamy-seasalt.jpg', // Using butterscotch-creamy-seasalt
            'Biscoff': 'biscoff.jpeg',
            'Caramel Macchiato': 'caramel-macchiato.webp',
            'Salted Caramel': 'salted-caramel.jpg',
            
            // COFFEE - ADDITIONAL
            'Oat Milk': 'air-mineral.jpg', // Using air-mineral as placeholder
            'Espresso Shot': 'air-mineral.jpg', // Using air-mineral as placeholder
            
            // COFFEE - MANMADE (hot/ice)
            'Kopi Cheesecake': 'kopi-gula-aren.jpg',
            'Kopi Gula Aren': 'kopi-gula-aren.jpg',
            'Butterscotch Creamy Seasalt': 'butterscotch-creamy-seasalt.jpg',
            'Cocoberry Americano': 'sparkling-berry-sour.jpg', // Using sparkling-berry-sour as placeholder
            'Coffee Cream': 'chocolate.jpg',
            'Matcha Kyoto': 'matcha-latte.jpg',
            
            // COFFEE - OATSIDE SERIES
            'Kopi Gula Aren (Oatside)': 'kopi-susu-gula-aren.jpg',
            'Kopi Cheesecake (Oatside)': 'kopi-susu-gula-aren.jpg',
            'Kopi Biscoff (Oatside)': 'biscoff.jpeg',
            'Salted Caramel (Oatside)': 'salted-caramel.jpg',
            
            // NON COFFEE
            'Squash Lychee': 'squash-lychee.jpg',
            'Squash Lemon': 'lemon-tea.jpg', // Using lemon-tea as placeholder
            'Squash Orange': 'lemon-tea.jpg', // Using lemon-tea as placeholder
            'Yakult Grape': 'yakult-grape.JPG',
            'Yakult Lychee': 'yakult-lychee.jpg',
            'Yakult Strawberry': 'yakult-strawberry.jpg',
            'Strawberry Cheesecake': 'strawberry-cheesecake.webp',
            'Milkshake Chocolate': 'chocolate.jpg',
            'Milkshake Vanilla': 'milkshake-vanilla.webp',
            'Milkshake Strawberry': 'milkshake-strawberry.jpg',
            'Matcha': 'matcha-latte.jpg',
            'Chocolate': 'chocolate.jpg',
            'Air Mineral': 'air-mineral.jpg',
            
            // TEA
            'Peach Tea': 'peach-tea.jpg',
            'Lychee Tea': 'lychee-tea.avif',
            'Lemon Tea': 'lemon-tea.jpg',
            'Black Earl Grey': 'black-earl-grey.jpeg',
            'Chamomile': 'chamomile-tea.jpg',
            'English Breakfast': 'english-breakfast.jpg',
            'Peppermint Infusion': 'peppermint-infusion.webp',
            
            // BARISTA'S SIGNATURE
            'Phantom': 'phantom.webp',
            'Siberian Green': 'siberian-green.jpeg',
            'Tropical Paradise': 'tropical-paradise.jpg',
            'Sparkling Berry Sour': 'sparkling-berry-sour.jpg',
            'Green Carribean': 'green-carribean.jpg'
        };

        let updatedCount = 0;
        let placeholderCount = 0;
        let keptExternalCount = 0;

        for (const item of menuItems) {
            const targetImage = accurateMapping[item.name];
            
            if (targetImage && existingFiles.includes(targetImage)) {
                // Update with exact match
                const newImageUrl = `/images/menu/${targetImage}`;
                await connection.execute(
                    'UPDATE menu_items SET image_url = ? WHERE id = ?',
                    [newImageUrl, item.id]
                );
                console.log(`✅ Updated: ${item.name} → ${targetImage}`);
                updatedCount++;
            } else if (targetImage) {
                // Use placeholder image
                const newImageUrl = `/images/menu/${targetImage}`;
                await connection.execute(
                    'UPDATE menu_items SET image_url = ? WHERE id = ?',
                    [newImageUrl, item.id]
                );
                console.log(`🔄 Placeholder: ${item.name} → ${targetImage}`);
                placeholderCount++;
            } else {
                // Keep external or current
                if (item.image_url.startsWith('https://images.unsplash.com')) {
                    console.log(`🌐 Kept external: ${item.name}`);
                    keptExternalCount++;
                } else {
                    console.log(`⚠️  No mapping: ${item.name}`);
                }
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`✅ Perfect matches: ${updatedCount} items`);
        console.log(`🔄 Placeholder matches: ${placeholderCount} items`);
        console.log(`🌐 Kept external URLs: ${keptExternalCount} items`);
        console.log(`📈 Total with local images: ${updatedCount + placeholderCount} items`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.end();
        console.log('\n🎉 Accurate image URL update completed!');
    }
}

updateImageUrlsAccurately();