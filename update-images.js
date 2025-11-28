const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateImageUrls() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'rich_jane_coffee'
    });

    try {
        console.log('🔧 Updating image URLs to match existing files...\n');

        // Mapping menu items to correct image files
        const imageMapping = {
            // MAKANAN
            'Fish n Chips': '/images/menu/fish-and-chips.jpg',
            'French Fries (Mozzarella)': '/images/menu/french-fries-mozzarella.jpg',
            'French Fries (No Mozzarella)': '/images/menu/french-fries.jpg',
            'Mix Platter': '/images/menu/mix-platter.jpg',
            'Tahu Cabe Garam': '/images/menu/tahu-cabe-garam.jpg',
            'Singkong Goreng Original': '/images/menu/singkong-goreng.jpg',
            'Singkong Goreng Keju': '/images/menu/singkong-goreng-keju.webp',
            'Kulit Cabe Garam': '/images/menu/kulit-cabe-garam.jpg',
            'Cireng Bumbu Rujak': '/images/menu/cireng-bumbu-rujak.jpg',
            'Chicken Pop Saos Thailand': '/images/menu/chicken-pop-saos-thailand.jpg',
            'Onion Ring': '/images/menu/onion-ring.jpg',
            'Calamary': '/images/menu/calamary.avif',
            
            // CROISSANT SERIES
            'Almond Croissant': '/images/menu/almond-croissant.jpg',
            'Butter Croissant': '/images/menu/butter-croissant.jpg',
            'Pain au Chocolate Croissant': '/images/menu/pain-au-chocolate.jpg',
            'Croissant Almond Choco': '/images/menu/croissant-almond-choco.jpg',
            'Croissant Strawberry Supreme': '/images/menu/croissant-strawberry-supreme.avif',
            'Croissant Creamcheese Bruleé': '/images/menu/croissant-cream-cheese-brulee.jpg',
            'Croissant Cheese Madness': '/images/menu/croissant-cheese-madness.jpg',
            'Croissant Smoked Beef & Cheese': '/images/menu/croissant-smoked-beef-and-cheese.jpg',
            'Cookies Croissant': '/images/menu/cookies-croissant.jpg',
            
            // SWEET TREATS
            'Basque Burnt Cheese Cake': '/images/menu/basque-cheesecake.jpg',
            'Brownies': '/images/menu/brownies.jpg',
            'Brownies Byts': '/images/menu/brownies-bites.jpg',
            'Cookies': '/images/menu/cookies.jpg',
            'Pistachio Kunafa Brownies': '/images/menu/pistachio-kunafa-brownies.png',
            'Classic Tiramisu': '/images/menu/tiramisu.jpg',
            
            // MAIN COURSE
            'Spaghetti Aglio Olio': '/images/menu/spaghetti-aglio-olio.jpg',
            'Spaghetti Bolognese': '/images/menu/spaghetti-bolognese.jpg',
            'Chicken Cordon Bleu': '/images/menu/chicken-cordon-bleu.webp',
            'Chicken Salted Egg': '/images/menu/chicken-salted-egg.jpg',
            'Nasi Jeruk Kulit Crispy': '/images/menu/nasi-jeruk-kulit-crispy.jpg',
            'Nasi Sapi Sambal Matah': '/images/menu/nasi-sapi-sambal-matah.jpg',
            'Mie Goreng Khas RJ': '/images/menu/mie-goreng-khas-rj.jpg',
            'Nasi Chicken Mozarella': '/images/menu/nasi-chicken-mozzarella.jpg',
            'Nasi Goreng Chicken Katsu': '/images/menu/nasi-goreng-chicken-katsu.jpg',
            'Nasi Goreng Tomyam Seafood': '/images/menu/nasi-goreng-seafood.jpg',
            'Nasi Gila': '/images/menu/nasi-gila.jpg',
            'Nasi Beef Teriyaki': '/images/menu/nasi-beef-teriyaki.jpg',
            'Katsu Curry Rice': '/images/menu/katsu-curry-rice.jpg',
            
            // BREAKFAST
            'Omellete French Fries': '/images/menu/omelette-french-fries.webp',
            'Mushroom Croissant': '/images/menu/mushroom-croissant.webp',
            
            // KIDS MEAL
            'Chicken Katsu + Rice': '/images/menu/nasi-goreng-chicken-katsu.jpg',
            'Fish n Chips (Kids)': '/images/menu/fish-and-chips.jpg',
            
            // COFFEE - MANUAL BREW
            'Vietnam Drip': '/images/menu/vietnam-drip.webp',
            'V60': '/images/menu/v60.webp',
            'French Press': '/images/menu/french-press.webp',
            'Syphon': '/images/menu/syphon.jpg',
            'Aeropress': '/images/menu/aeropress.jpg',
            'Japanese': '/images/menu/japanese.webp',
            
            // COFFEE - BLACK
            'Americano': '/images/menu/americano.jpg',
            'Long Black': '/images/menu/long-black.jpg',
            
            // COFFEE - WHITE
            'Cappuccino': '/images/menu/cappuccino.jpg',
            'Flat White': '/images/menu/flat-white.jpg',
            'Vietnamese Iced Coffee': '/images/menu/vietnamese-iced-coffee.jpg',
            
            // COFFEE - LATTE
            'Caffe Latte': '/images/menu/caffe-latte.jpg',
            'Caramel Latte': '/images/menu/caramel-latte.jpg',
            'Butterscotch': '/images/menu/butterscotch-latte.jpg',
            'Biscoff': '/images/menu/kopi-biscoff.jpeg',
            'Caramel Macchiato': '/images/menu/caramel-macchiato.webp',
            'Salted Caramel': '/images/menu/salted-caramel.jpg',
            
            // COFFEE - ADDITIONAL
            'Oat Milk': '/images/menu/oat-milk.jpg',
            'Espresso Shot': '/images/menu/espresso-shot.jpg',
            
            // COFFEE - MANMADE
            'Kopi Cheesecake': '/images/menu/kopi-cheesecake.jpg',
            'Kopi Gula Aren': '/images/menu/kopi-gula-aren.jpg',
            'Butterscotch Creamy Seasalt': '/images/menu/butterscotch-creamy-seasalt.jpg',
            'Cocoberry Americano': '/images/menu/cocoberry-americano.jpg',
            'Coffee Cream': '/images/menu/coffee-cream.jpg',
            'Matcha Kyoto': '/images/menu/matcha-kyoto.jpg',
            
            // COFFEE - OATSIDE SERIES
            'Kopi Gula Aren (Oatside)': '/images/menu/kopi-gula-aren-oatside.jpg',
            'Kopi Cheesecake (Oatside)': '/images/menu/kopi-cheesecake-oatside.jpg',
            'Kopi Biscoff (Oatside)': '/images/menu/kopi-biscoff-oatside.jpg',
            'Salted Caramel (Oatside)': '/images/menu/salted-caramel-oatside.jpg',
            
            // NON COFFEE
            'Squash Lychee': '/images/menu/squash-lychee.jpg',
            'Squash Lemon': '/images/menu/squash-lemon.jpg',
            'Squash Orange': '/images/menu/squash-orange.jpg',
            'Yakult Grape': '/images/menu/yakult-grape.JPG',
            'Yakult Lychee': '/images/menu/yakult-lychee.jpg',
            'Yakult Strawberry': '/images/menu/yakult-strawberry.jpg',
            'Strawberry Cheesecake': '/images/menu/strawberry-cheesecake.webp',
            'Milkshake Chocolate': '/images/menu/milkshake-chocolate.jpg',
            'Milkshake Vanilla': '/images/menu/milkshake-vanilla.webp',
            'Milkshake Strawberry': '/images/menu/milkshake-strawberry.jpg',
            'Matcha': '/images/menu/matcha.jpg',
            'Chocolate': '/images/menu/chocolate.jpg',
            'Air Mineral': '/images/menu/air-mineral.jpg',
            
            // TEA
            'Peach Tea': '/images/menu/peach-tea.jpg',
            'Lychee Tea': '/images/menu/lychee-tea.avif',
            'Lemon Tea': '/images/menu/lemon-tea.jpg',
            'Black Earl Grey': '/images/menu/black-earl-grey.jpeg',
            'Chamomile': '/images/menu/chamomile-tea.jpg',
            'English Breakfast': '/images/menu/english-breakfast.jpg',
            'Peppermint Infusion': '/images/menu/peppermint-infusion.webp',
            
            // BARISTA'S SIGNATURE
            'Phantom': '/images/menu/phantom.webp',
            'Siberian Green': '/images/menu/siberian-green.jpeg',
            'Tropical Paradise': '/images/menu/tropical-paradise.jpg',
            'Sparkling Berry Sour': '/images/menu/sparkling-berry-sour.jpg',
            'Green Carribean': '/images/menu/green-carribean.jpg'
        };

        let updatedCount = 0;
        let notFoundCount = 0;

        for (const [menuName, imageUrl] of Object.entries(imageMapping)) {
            try {
                const [result] = await connection.execute(
                    'UPDATE menu_items SET image_url = ? WHERE name = ?',
                    [imageUrl, menuName]
                );
                
                if (result.affectedRows > 0) {
                    console.log(`✅ Updated: ${menuName} → ${imageUrl}`);
                    updatedCount++;
                } else {
                    console.log(`⚠️  Not found: ${menuName}`);
                    notFoundCount++;
                }
            } catch (error) {
                console.log(`❌ Error updating ${menuName}: ${error.message}`);
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`✅ Successfully updated: ${updatedCount} items`);
        console.log(`⚠️  Not found in database: ${notFoundCount} items`);
        
        // For items that don't have specific images, use placeholder
        const [remainingItems] = await connection.execute(
            'SELECT name FROM menu_items WHERE image_url LIKE "https://images.unsplash.com%"'
        );
        
        if (remainingItems.length > 0) {
            console.log(`\n🔄 Setting placeholder for remaining ${remainingItems.length} items...`);
            for (const item of remainingItems) {
                await connection.execute(
                    'UPDATE menu_items SET image_url = ? WHERE name = ?',
                    ['/images/menu/placeholder.jpg', item.name]
                );
                console.log(`📝 Placeholder set: ${item.name}`);
            }
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.end();
        console.log('\n🎉 Image URL update completed!');
    }
}

updateImageUrls();