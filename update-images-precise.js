const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function updateImageUrlsPrecisely() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'rich_jane_coffee'
    });

    try {
        console.log('🎯 Precisely matching menu names with image files...\n');

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

        // Create precise mapping based on exact menu names
        const preciseMapping = {
            // MAKANAN - STARTER
            'Fish n Chips': 'fish-and-chips.jpg',
            'French Fries (Mozzarella)': 'french-fries-mozzarella.jpg',
            'French Fries (No Mozzarella)': 'french-fries.jpg',
            'Mix Platter': 'mix-platter.jpg',
            'Tahu Cabe Garam': 'tahu-cabe-garam.jpg',
            'Singkong Goreng Original': 'singkong-goreng.jpg',
            'Singkong Goreng Keju': 'singkong-goreng-keju.webp',
            'Kulit Cabe Garam': 'kulit-cabe-garam.jpg',
            'Cireng Bumbu Rujak': 'cireng-bumbu-rujak.jpg',
            'Chicken Pop Saos Thailand': 'chicken-pop-saos-thailand.jpg',
            'Onion Ring': 'onion-ring.jpg',
            'Calamary': 'calamary.avif',
            
            // PASTRY - CROISSANT SERIES
            'Almond Croissant': 'almond-croissant.jpg',
            'Butter Croissant': 'butter-croissant.jpg',
            'Pain au Chocolate Croissant': 'pain-au-chocolate.jpg',
            'Croissant Almond Choco': 'croissant-almond-choco.jpg',
            'Croissant Strawberry Supreme': 'croissant-strawberry-supreme.avif',
            'Croissant Creamcheese Bruleé': 'croissant-cream-cheese-brulee.jpg',
            'Croissant Cheese Madness': 'croissant-cheese-madness.jpg',
            'Croissant Smoked Beef & Cheese': 'croissant-smoked-beef-and-cheese.jpg',
            'Cookies Croissant': 'cookies-croissant.jpg',
            
            // SWEET TREATS
            'Basque Burnt Cheese Cake': 'basque-cheesecake.jpg',
            'Brownies': 'brownies.jpg',
            'Brownies Byts': 'brownies-bites.jpg',
            'Cookies': 'cookies.jpg',
            'Pistachio Kunafa Brownies': 'pistachio-kunafa-brownies.png',
            'Classic Tiramisu': 'tiramisu.jpg',
            
            // MAIN COURSE - WESTERN
            'Spaghetti Aglio Olio': 'spaghetti-aglio-olio.jpg',
            'Spaghetti Bolognese': 'spaghetti-bolognese.jpg',
            'Chicken Cordon Bleu': 'chicken-cordon-bleu.webp',
            
            // MAIN COURSE - ASIAN CUISINE
            'Chicken Salted Egg': 'chicken-salted-egg.jpg',
            'Nasi Jeruk Kulit Crispy': 'nasi-jeruk-kulit-crispy.jpg',
            'Nasi Sapi Sambal Matah': 'nasi-sapi-sambal-matah.jpg',
            'Mie Goreng Khas RJ': 'mie-goreng-khas-rj.jpg',
            'Nasi Chicken Mozarella': 'nasi-chicken-mozzarella.jpg',
            'Nasi Goreng Chicken Katsu': 'nasi-goreng-chicken-katsu.jpg',
            'Nasi Goreng Tomyam Seafood': 'nasi-goreng-seafood.jpg',
            'Nasi Gila': 'nasi-gila.jpg',
            'Nasi Beef Teriyaki': 'nasi-beef-teriyaki.jpg',
            'Katsu Curry Rice': 'katsu-curry-rice.jpg',
            
            // BREAKFAST
            'Omellete French Fries': 'omelette-french-fries.webp',
            'Mushroom Croissant': 'mushroom-croissant.webp',
            
            // KIDS MEAL
            'Chicken Katsu + Rice': 'chicken-katsu-rice.jpg',
            'Fish n Chips (Kids)': 'fish-and-chips-kids.jpg',
            
            // COFFEE - MANUAL BREW ARABICA BEAN
            'Vietnam Drip': 'vietnam-drip.webp',
            'V60': 'v60.webp',
            'French Press': 'french-press.webp',
            'Syphon': 'syphon.jpg',
            'Aeropress': 'aeropress.jpg',
            'Japanese': 'japanese.webp',
            
            // COFFEE - BLACK (hot/ice)
            'Americano': 'americano.jpg',
            'Long Black': 'long-black.jpg',
            
            // COFFEE - WHITE (hot/ice)
            'Cappuccino': 'cappuccino.jpg',
            'Flat White': 'flat-white.jpg',
            'Vietnamese Iced Coffee': 'vietnamese-iced-coffee.jpg',
            
            // COFFEE - LATTE (hot/ice)
            'Caffe Latte': 'caffe-latte.jpg',
            'Caramel Latte': 'caramel-latte.jpg',
            'Butterscotch': 'butterscotch-latte.jpg',
            'Biscoff': 'biscoff.jpeg',
            'Caramel Macchiato': 'caramel-macchiato.webp',
            'Salted Caramel': 'salted-caramel.jpg',
            
            // COFFEE - ADDITIONAL
            'Oat Milk': 'oat-milk.jpg',
            'Espresso Shot': 'espresso-shot.jpg',
            
            // COFFEE - MANMADE (hot/ice)
            'Kopi Cheesecake': 'kopi-cheesecake.jpg',
            'Kopi Gula Aren': 'kopi-gula-aren.jpg',
            'Butterscotch Creamy Seasalt': 'butterscotch-creamy-seasalt.jpg',
            'Cocoberry Americano': 'cocoberry-americano.jpg',
            'Coffee Cream': 'coffee-cream.jpg',
            'Matcha Kyoto': 'matcha-kyoto.jpg',
            
            // COFFEE - OATSIDE SERIES
            'Kopi Gula Aren (Oatside)': 'kopi-gula-aren-oatside.jpg',
            'Kopi Cheesecake (Oatside)': 'kopi-cheesecake-oatside.jpg',
            'Kopi Biscoff (Oatside)': 'kopi-biscoff-oatside.jpg',
            'Salted Caramel (Oatside)': 'salted-caramel-oatside.jpg',
            
            // NON COFFEE
            'Squash Lychee': 'squash-lychee.jpg',
            'Squash Lemon': 'squash-lemon.jpg',
            'Squash Orange': 'squash-orange.jpg',
            'Yakult Grape': 'yakult-grape.JPG',
            'Yakult Lychee': 'yakult-lychee.jpg',
            'Yakult Strawberry': 'yakult-strawberry.jpg',
            'Strawberry Cheesecake': 'strawberry-cheesecake.webp',
            'Milkshake Chocolate': 'milkshake-chocolate.jpg',
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
        let notFoundCount = 0;
        let keptExternalCount = 0;

        for (const item of menuItems) {
            const targetImage = preciseMapping[item.name];
            
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
                // Target image specified but file doesn't exist
                console.log(`❌ Missing file: ${item.name} → ${targetImage}`);
                notFoundCount++;
            } else {
                // No specific mapping, keep current or use external
                if (item.image_url.startsWith('https://images.unsplash.com')) {
                    console.log(`🌐 Kept external: ${item.name}`);
                    keptExternalCount++;
                } else {
                    console.log(`⚠️  No mapping: ${item.name}`);
                }
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`✅ Successfully updated: ${updatedCount} items`);
        console.log(`❌ Missing image files: ${notFoundCount} items`);
        console.log(`🌐 Kept external URLs: ${keptExternalCount} items`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.end();
        console.log('\n🎉 Precise image URL update completed!');
    }
}

updateImageUrlsPrecisely();