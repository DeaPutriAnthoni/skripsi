const express = require('express');
const path = require('path');
const qr = require('qrcode');

const app = express();
const PORT = 8080;

// Static files
app.use(express.static('public'));
app.use(express.json());

// Mock database
let orders = [];
let orderIdCounter = 1;

// Menu API - Complete 98 items from original database
app.get('/api/menu', (req, res) => {
    res.json({
        success: true,
        message: 'Menu berhasil diambil dari cache',
        data: {
            data: [
                // STARTER
                {id: 1, name: 'Fish n Chips', category: 'makanan', price: 39000, description: 'Ikan goreng crispy dengan kentang goreng', image_url: '/images/menu/fish-and-chips.jpg'},
                {id: 2, name: 'French Fries (Mozzarella)', category: 'makanan', price: 27000, description: 'Kentang goreng dengan keju mozzarella', image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'},
                {id: 3, name: 'French Fries (No Mozzarella)', category: 'makanan', price: 22000, description: 'Kentang goreng original', image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'},
                {id: 4, name: 'Mix Platter', category: 'makanan', price: 30000, description: 'Sosis, Kentang, Nugget, Onion Ring', image_url: '/images/menu/mix-platter.jpg'},
                {id: 5, name: 'Tahu Cabe Garam', category: 'makanan', price: 22000, description: 'Tahu goreng dengan bumbu cabe garam', image_url: '/images/menu/tahu-cabe-garam.jpg'},
                {id: 6, name: 'Singkong Goreng Original', category: 'makanan', price: 22000, description: 'Singkong goreng crispy original', image_url: '/images/menu/singkong-goreng.jpg'},
                {id: 7, name: 'Singkong Goreng Keju', category: 'makanan', price: 27000, description: 'Singkong goreng dengan taburan keju', image_url: '/images/menu/singkong-goreng-keju.webp'},
                {id: 8, name: 'Kulit Cabe Garam', category: 'makanan', price: 27000, description: 'Kulit ayam crispy dengan bumbu cabe garam', image_url: '/images/menu/kulit-cabe-garam.jpg'},
                {id: 9, name: 'Cireng Bumbu Rujak', category: 'makanan', price: 22000, description: 'Cireng dengan bumbu rujak pedas manis', image_url: '/images/menu/cireng-bumbu-rujak.jpg'},
                {id: 10, name: 'Chicken Pop Saos Thailand', category: 'makanan', price: 28000, description: 'Popcorn chicken dengan saus Thailand', image_url: '/images/menu/chicken-pop-saos-thailand.jpg'},
                {id: 11, name: 'Onion Ring', category: 'makanan', price: 22000, description: 'Onion rings crispy', image_url: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400'},
                {id: 12, name: 'Calamary', category: 'makanan', price: 32000, description: 'Cumi goreng tepung', image_url: '/images/menu/calamary.avif'},
                
                // PASTRY - CROISSANT SERIES
                {id: 13, name: 'Almond Croissant', category: 'makanan', price: 28000, description: 'Croissant dengan almond filling', image_url: '/images/menu/almond-croissant.jpg'},
                {id: 14, name: 'Butter Croissant', category: 'makanan', price: 18000, description: 'Croissant butter klasik', image_url: '/images/menu/butter-croissant.jpg'},
                {id: 15, name: 'Pain au Chocolate Croissant', category: 'makanan', price: 21000, description: 'Croissant dengan cokelat', image_url: '/images/menu/pain-au-chocolate.jpg'},
                {id: 16, name: 'Croissant Almond Choco', category: 'makanan', price: 30000, description: 'Croissant almond dengan cokelat', image_url: '/images/menu/almond-croissant.jpg'},
                {id: 17, name: 'Croissant Strawberry Supreme', category: 'makanan', price: 35000, description: 'Croissant dengan strawberry premium', image_url: '/images/menu/croissant-strawberry-supreme.avif'},
                {id: 18, name: 'Croissant Creamcheese Bruleé', category: 'makanan', price: 35000, description: 'Croissant cream cheese dengan bruleé', image_url: '/images/menu/croissant-cream-cheese-brulee.jpg'},
                {id: 19, name: 'Croissant Cheese Madness', category: 'makanan', price: 32000, description: 'Croissant dengan keju melimpah', image_url: '/images/menu/croissant-cheese-madness.jpg'},
                {id: 20, name: 'Croissant Smoked Beef & Cheese', category: 'makanan', price: 38000, description: 'Croissant dengan smoked beef dan keju', image_url: '/images/menu/croissant-smoked-beef-and-cheese.jpg'},
                {id: 21, name: 'Cookies Croissant', category: 'makanan', price: 38000, description: 'Croissant dengan cookies', image_url: '/images/menu/cookies-croissant.jpg'},
                
                // SWEET TREATS
                {id: 22, name: 'Basque Burnt Cheese Cake', category: 'makanan', price: 35000, description: 'Basque burnt cheese cake per slice', image_url: '/images/menu/basque-cheesecake.jpg'},
                {id: 23, name: 'Brownies', category: 'makanan', price: 20000, description: 'Brownies cokelat lembut', image_url: '/images/menu/brownies.jpg'},
                {id: 24, name: 'Brownies Byts', category: 'makanan', price: 27000, description: 'Brownies bites ukuran kecil', image_url: '/images/menu/brownies.jpg'},
                {id: 25, name: 'Cookies', category: 'makanan', price: 18000, description: 'Cookies renyah', image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400'},
                {id: 26, name: 'Pistachio Kunafa Brownies', category: 'makanan', price: 45000, description: 'Brownies pistachio dengan kunafa', image_url: '/images/menu/pistachio-kunafa-brownies.png'},
                {id: 27, name: 'Classic Tiramisu', category: 'makanan', price: 38000, description: 'Tiramisu klasik per box (weekend only)', image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'},
                
                // MAIN COURSE - WESTERN
                {id: 28, name: 'Spaghetti Aglio Olio', category: 'makanan', price: 38000, description: 'Spaghetti dengan minyak bawang putih', image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400'},
                {id: 29, name: 'Spaghetti Bolognese', category: 'makanan', price: 38000, description: 'Spaghetti dengan saus daging cincang', image_url: '/images/menu/spaghetti-bolognese.jpg'},
                {id: 30, name: 'Chicken Cordon Bleu', category: 'makanan', price: 39000, description: 'Ayam gulung dengan ham dan keju', image_url: '/images/menu/chicken-cordon-bleu.webp'},
                
                // MAIN COURSE - ASIAN CUISINE
                {id: 31, name: 'Chicken Salted Egg', category: 'makanan', price: 35000, description: 'Ayam dengan saus telur asin', image_url: '/images/menu/chicken-salted-egg.jpg'},
                {id: 32, name: 'Nasi Jeruk Kulit Crispy', category: 'makanan', price: 33000, description: 'Nasi dengan ayam jeruk kulit crispy', image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'},
                {id: 33, name: 'Nasi Sapi Sambal Matah', category: 'makanan', price: 35000, description: 'Nasi dengan sapi sambal matah', image_url: '/images/menu/nasi-sapi-sambal-matah.jpg'},
                {id: 34, name: 'Mie Goreng Khas RJ', category: 'makanan', price: 27000, description: 'Mie goreng spesial Rich and Jane', image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400'},
                {id: 35, name: 'Nasi Chicken Mozarella', category: 'makanan', price: 35000, description: 'Nasi ayam dengan keju mozarella', image_url: '/images/menu/nasi-chicken-mozzarella.jpg'},
                {id: 36, name: 'Nasi Goreng Chicken Katsu', category: 'makanan', price: 35000, description: 'Nasi goreng dengan chicken katsu', image_url: '/images/menu/nasi-goreng-chicken-katsu.jpg'},
                {id: 37, name: 'Nasi Goreng Tomyam Seafood', category: 'makanan', price: 37000, description: 'Nasi goreng tomyam dengan seafood', image_url: '/images/menu/nasi-goreng-seafood.jpg'},
                {id: 38, name: 'Nasi Gila', category: 'makanan', price: 32000, description: 'Nasi goreng pedas dengan berbagai topping', image_url: '/images/menu/nasi-gila.jpg'},
                {id: 39, name: 'Nasi Beef Teriyaki', category: 'makanan', price: 39000, description: 'Nasi dengan beef teriyaki', image_url: '/images/menu/nasi-beef-teriyaki.jpg'},
                {id: 40, name: 'Katsu Curry Rice', category: 'makanan', price: 39000, description: 'Nasi kari dengan chicken katsu', image_url: '/images/menu/nasi-goreng-chicken-katsu.jpg'},
                
                // BREAKFAST
                {id: 41, name: 'Omellete French Fries', category: 'makanan', price: 25000, description: 'Omelet dengan kentang goreng', image_url: '/images/menu/omelette-french-fries.webp'},
                {id: 42, name: 'Mushroom Croissant', category: 'makanan', price: 36000, description: 'Croissant dengan mushroom', image_url: '/images/menu/mushroom-croissant.webp'},
                
                // KIDS MEAL
                {id: 43, name: 'Chicken Katsu + Rice', category: 'makanan', price: 30000, description: 'Menu anak: Chicken katsu dengan nasi', image_url: '/images/menu/nasi-goreng-chicken-katsu.jpg'},
                {id: 44, name: 'Fish n Chips (Kids)', category: 'makanan', price: 30000, description: 'Menu anak: Fish and chips', image_url: '/images/menu/fish-and-chips.jpg'},
                
                // COFFEE - MANUAL BREW ARABICA BEAN
                {id: 45, name: 'Vietnam Drip', category: 'minuman', price: 28000, description: 'Kopi Vietnam drip', image_url: '/images/menu/vietnam-drip.webp'},
                {id: 46, name: 'V60', category: 'minuman', price: 32000, description: 'Manual brew V60', image_url: '/images/menu/v60.webp'},
                {id: 47, name: 'French Press', category: 'minuman', price: 32000, description: 'Manual brew French Press', image_url: '/images/menu/french-press.webp'},
                {id: 48, name: 'Syphon', category: 'minuman', price: 32000, description: 'Manual brew Syphon', image_url: '/images/menu/syphon.jpg'},
                {id: 49, name: 'Aeropress', category: 'minuman', price: 32000, description: 'Manual brew Aeropress', image_url: '/images/menu/french-press.webp'},
                {id: 50, name: 'Japanese', category: 'minuman', price: 32000, description: 'Manual brew Japanese style', image_url: '/images/menu/japanese.webp'},
                
                // COFFEE - BLACK (hot/ice)
                {id: 51, name: 'Americano', category: 'minuman', price: 23000, description: 'Espresso dengan air panas (hot/ice)', image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'},
                {id: 52, name: 'Long Black', category: 'minuman', price: 23000, description: 'Long black coffee (hot/ice)', image_url: '/images/menu/long-black.jpg'},
                
                // COFFEE - WHITE (hot/ice)
                {id: 53, name: 'Cappuccino', category: 'minuman', price: 25000, description: 'Espresso dengan susu dan foam (hot/ice)', image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400'},
                {id: 54, name: 'Flat White', category: 'minuman', price: 25000, description: 'Espresso dengan microfoam susu (hot/ice)', image_url: '/images/menu/caffe-latte.jpg'},
                {id: 55, name: 'Vietnamese Iced Coffee', category: 'minuman', price: 25000, description: 'Es kopi susu Vietnam', image_url: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400'},
                
                // COFFEE - LATTE (hot/ice)
                {id: 56, name: 'Caffe Latte', category: 'minuman', price: 28000, description: 'Espresso dengan susu (hot/ice)', image_url: '/images/menu/caffe-latte.jpg'},
                {id: 57, name: 'Caramel Latte', category: 'minuman', price: 28000, description: 'Latte dengan caramel (hot/ice)', image_url: '/images/menu/caramel-latte.jpg'},
                {id: 58, name: 'Butterscotch', category: 'minuman', price: 28000, description: 'Latte dengan butterscotch (-coffee/ice)', image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400'},
                {id: 59, name: 'Biscoff', category: 'minuman', price: 28000, description: 'Latte dengan biscoff (hot/ice)', image_url: '/images/menu/biscoff.jpeg'},
                {id: 60, name: 'Caramel Macchiato', category: 'minuman', price: 28000, description: 'Caramel macchiato (hot/ice)', image_url: '/images/menu/caramel-macchiato.webp'},
                {id: 61, name: 'Salted Caramel', category: 'minuman', price: 28000, description: 'Latte salted caramel (hot/ice)', image_url: '/images/menu/salted-caramel.jpg'},
                
                // COFFEE - ADDITIONAL
                {id: 62, name: 'Oat Milk', category: 'minuman', price: 9000, description: 'Tambahan oat milk', image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'},
                {id: 63, name: 'Espresso Shot', category: 'minuman', price: 11000, description: 'Tambahan espresso shot', image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400'},
                
                // COFFEE - MANMADE (hot/ice)
                {id: 64, name: 'Kopi Cheesecake', category: 'minuman', price: 29000, description: 'Kopi dengan rasa cheesecake (ice)', image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400'},
                {id: 65, name: 'Kopi Gula Aren', category: 'minuman', price: 25000, description: 'Kopi dengan gula aren (ice)', image_url: '/images/menu/kopi-gula-aren.jpg'},
                {id: 66, name: 'Butterscotch Creamy Seasalt', category: 'minuman', price: 33000, description: 'Butterscotch dengan creamy seasalt', image_url: '/images/menu/butterscotch-creamy-seasalt.jpg'},
                {id: 67, name: 'Cocoberry Americano', category: 'minuman', price: 30000, description: 'Americano dengan cocoberry', image_url: '/images/menu/tropical-paradise.jpg'},
                {id: 68, name: 'Coffee Cream', category: 'minuman', price: 25000, description: 'Kopi dengan cream', image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400'},
                {id: 69, name: 'Matcha Kyoto', category: 'minuman', price: 30000, description: 'Matcha premium Kyoto', image_url: '/images/menu/matcha-latte.jpg'},
                
                // COFFEE - OATSIDE SERIES
                {id: 70, name: 'Kopi Gula Aren (Oatside)', category: 'minuman', price: 30000, description: 'Kopi gula aren dengan oat milk', image_url: '/images/menu/kopi-gula-aren.jpg'},
                {id: 71, name: 'Kopi Cheesecake (Oatside)', category: 'minuman', price: 35000, description: 'Kopi cheesecake dengan oat milk', image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400'},
                {id: 72, name: 'Kopi Biscoff (Oatside)', category: 'minuman', price: 35000, description: 'Kopi biscoff dengan oat milk', image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400'},
                {id: 73, name: 'Salted Caramel (Oatside)', category: 'minuman', price: 35000, description: 'Salted caramel dengan oat milk', image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400'},
                
                // NON COFFEE
                {id: 74, name: 'Squash Lychee', category: 'minuman', price: 25000, description: 'Squash rasa lychee', image_url: '/images/menu/squash-lychee.jpg'},
                {id: 75, name: 'Squash Lemon', category: 'minuman', price: 25000, description: 'Squash rasa lemon', image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'},
                {id: 76, name: 'Squash Orange', category: 'minuman', price: 25000, description: 'Squash rasa orange', image_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'},
                {id: 77, name: 'Yakult Grape', category: 'minuman', price: 25000, description: 'Yakult dengan anggur', image_url: '/images/menu/yakult-grape.JPG'},
                {id: 78, name: 'Yakult Lychee', category: 'minuman', price: 25000, description: 'Yakult dengan lychee', image_url: '/images/menu/yakult-lychee.jpg'},
                {id: 79, name: 'Yakult Strawberry', category: 'minuman', price: 25000, description: 'Yakult dengan strawberry', image_url: '/images/menu/yakult-strawberry.jpg'},
                {id: 80, name: 'Strawberry Cheesecake', category: 'minuman', price: 30000, description: 'Minuman rasa strawberry cheesecake', image_url: '/images/menu/strawberry-cheesecake.webp'},
                {id: 81, name: 'Milkshake Chocolate', category: 'minuman', price: 28000, description: 'Milkshake rasa cokelat', image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'},
                {id: 82, name: 'Milkshake Vanilla', category: 'minuman', price: 28000, description: 'Milkshake rasa vanilla', image_url: '/images/menu/milkshake-vanilla.webp'},
                {id: 83, name: 'Milkshake Strawberry', category: 'minuman', price: 28000, description: 'Milkshake rasa strawberry', image_url: '/images/menu/milkshake-strawberry.jpg'},
                {id: 84, name: 'Matcha', category: 'minuman', price: 33000, description: 'Matcha premium', image_url: '/images/menu/matcha-latte.jpg'},
                {id: 85, name: 'Chocolate', category: 'minuman', price: 33000, description: 'Hot chocolate premium', image_url: '/images/menu/chocolate.jpg'},
                {id: 86, name: 'Air Mineral', category: 'minuman', price: 8000, description: 'Air mineral botol', image_url: '/images/menu/air-mineral.jpg'},
                
                // TEA
                {id: 87, name: 'Peach Tea', category: 'minuman', price: 26000, description: 'Teh dengan rasa peach', image_url: '/images/menu/peach-tea.jpg'},
                {id: 88, name: 'Lychee Tea', category: 'minuman', price: 26000, description: 'Teh dengan rasa lychee', image_url: '/images/menu/lychee-tea.avif'},
                {id: 89, name: 'Lemon Tea', category: 'minuman', price: 26000, description: 'Teh dengan lemon segar', image_url: '/images/menu/lemon-tea.jpg'},
                {id: 90, name: 'Black Earl Grey', category: 'minuman', price: 30000, description: 'Teh black earl grey', image_url: '/images/menu/black-earl-grey.jpeg'},
                {id: 91, name: 'Chamomile', category: 'minuman', price: 30000, description: 'Teh chamomile', image_url: '/images/menu/chamomile-tea.jpg'},
                {id: 92, name: 'English Breakfast', category: 'minuman', price: 30000, description: 'Teh English breakfast', image_url: '/images/menu/english-breakfast.jpg'},
                {id: 93, name: 'Peppermint Infusion', category: 'minuman', price: 30000, description: 'Teh peppermint', image_url: '/images/menu/peppermint-infusion.webp'},
                
                // BARISTA'S SIGNATURE
                {id: 94, name: 'Phantom', category: 'minuman', price: 35000, description: 'Espresso, Chocolate, Caramel - Signature', image_url: '/images/menu/phantom.webp'},
                {id: 95, name: 'Siberian Green', category: 'minuman', price: 35000, description: 'Espresso, Green Apple, Sugarcane - Signature', image_url: '/images/menu/siberian-green.jpeg'},
                {id: 96, name: 'Tropical Paradise', category: 'minuman', price: 35000, description: 'Mixfruit, Mintleaf, Lemonade - Signature', image_url: '/images/menu/tropical-paradise.jpg'},
                {id: 97, name: 'Sparkling Berry Sour', category: 'minuman', price: 35000, description: 'Blacktea, Cranberries, Mixed Fruit - Signature', image_url: '/images/menu/sparkling-berry-sour.jpg'},
                {id: 98, name: 'Green Carribean', category: 'minuman', price: 35000, description: 'Kiwi, Lemonade, Elderflower - Signature', image_url: '/images/menu/green-carribean.jpg'}
            ],
            count: 98,
            cached: true
        },
        timestamp: new Date().toISOString()
    });
});

// QR Code API
app.get('/api/qrcode/:table', async (req, res) => {
    try {
        const tableNumber = req.params.table;
        const url = `http://localhost:3000/menu.html?table=${tableNumber}`;
        const qrCode = await qr.toDataURL(url);
        
        res.json({
            success: true,
            message: 'QR Code berhasil digenerate',
            data: {
                table_number: parseInt(tableNumber),
                qr_code: qrCode,
                url: url
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal generate QR Code',
            error: error.message
        });
    }
});

// Get Order by ID API
app.get('/api/order/:orderId', (req, res) => {
    try {
        const { orderId } = req.params;
        const order = orders.find(o => o.id == orderId);
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order tidak ditemukan'
            });
        }
        
        res.json({
            success: true,
            message: 'Order berhasil diambil',
            data: {
                order_id: order.id,
                table_number: order.table_number,
                total_amount: order.total_amount,
                items: order.items,
                created_at: order.created_at,
                status: order.status || 'pending'
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan: ' + error.message
        });
    }
});

// Order API
app.post('/api/orders', (req, res) => {
    try {
        const { table_number, items, total_amount } = req.body;
        
        const order = {
            id: orderIdCounter++,
            table_number,
            total_amount,
            created_at: new Date().toISOString(),
            items: items.map(item => ({
                id: Math.random().toString(36).substr(2, 9),
                order_id: orderIdCounter - 1,
                menu_item_id: item.menu_item_id,
                name: item.name || 'Item',
                price: item.price || 0,
                quantity: item.quantity,
                status: 'orderan_masuk'
            }))
        };
        
        orders.push(order);
        
        res.json({
            success: true,
            message: 'Order berhasil dibuat',
            data: {
                order_id: order.id,
                table_number: order.table_number,
                total_amount: order.total_amount,
                items: order.items,
                created_at: order.created_at
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal membuat order',
            error: error.message
        });
    }
});

// Get Orders API
app.get('/api/orders', (req, res) => {
    res.json({
        success: true,
        message: 'Orders berhasil diambil',
        data: {
            orders: orders,
            count: orders.length
        },
        timestamp: new Date().toISOString()
    });
});



// Update Order Status API
app.put('/api/order/:orderId/item/:itemId/status', (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        const { status } = req.body;
        
        const order = orders.find(o => o.id == orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order tidak ditemukan'
            });
        }
        
        const item = order.items.find(i => i.id === itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item tidak ditemukan'
            });
        }
        
        item.status = status;
        
        res.json({
            success: true,
            message: 'Status berhasil diupdate',
            data: {
                order_id: orderId,
                item_id: itemId,
                new_status: status
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal update status',
            error: error.message
        });
    }
});

// Health Check API
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'System healthy',
        data: {
            status: 'healthy',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            orders_count: orders.length
        },
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, 'localhost', () => {
    console.log(`🚀 Rich and Jane Coffee Test Server`);
    console.log(`📍 Server running on http://localhost:${PORT}`);
    console.log(`📱 Menu Display: http://localhost:${PORT}/menu.html?table=1`);
    console.log(`🍳 Kitchen Display: http://localhost:${PORT}/kitchen.html`);
    console.log(`📋 QR Generator: http://localhost:${PORT}/qrcode.html`);
    console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`\n✅ Test Server Ready!`);
});