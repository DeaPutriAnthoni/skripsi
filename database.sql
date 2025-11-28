CREATE DATABASE IF NOT EXISTS rich_jane_coffee;
USE rich_jane_coffee;

-- Tabel Menu_Items
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category ENUM('makanan', 'minuman') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel Orders
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_number INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel Order_Items
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orders_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    status ENUM('orderan_masuk', 'orderan_selesai', 'orderan_diantar', 'dibayar') 
        DEFAULT 'orderan_masuk',
    quantity INT NOT NULL,
    FOREIGN KEY (orders_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===================================
-- INSERT MENU MAKANAN
-- ===================================

-- STARTER
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Fish n Chips', 'makanan', 39000, 'Ikan goreng crispy dengan kentang goreng', '/images/menu/fish-and-chips.jpg'),
('French Fries (Mozzarella)', 'makanan', 27000, 'Kentang goreng dengan keju mozzarella', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'),
('French Fries (No Mozzarella)', 'makanan', 22000, 'Kentang goreng original', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'),
('Mix Platter', 'makanan', 30000, 'Sosis, Kentang, Nugget, Onion Ring', '/images/menu/fish-and-chips.jpg'),
('Tahu Cabe Garam', 'makanan', 22000, 'Tahu goreng dengan bumbu cabe garam', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'),
('Singkong Goreng Original', 'makanan', 22000, 'Singkong goreng crispy original', 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400'),
('Singkong Goreng Keju', 'makanan', 27000, 'Singkong goreng dengan taburan keju', 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400'),
('Kulit Cabe Garam', 'makanan', 27000, 'Kulit ayam crispy dengan bumbu cabe garam', 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400'),
('Cireng Bumbu Rujak', 'makanan', 22000, 'Cireng dengan bumbu rujak pedas manis', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400'),
('Chicken Pop Saos Thailand', 'makanan', 28000, 'Popcorn chicken dengan saus Thailand', 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400'),
('Onion Ring', 'makanan', 22000, 'Onion rings crispy', 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400'),
('Calamary', 'makanan', 32000, 'Cumi goreng tepung', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400');

-- PASTRY - CROISSANT SERIES
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Almond Croissant', 'makanan', 28000, 'Croissant dengan almond filling', '/images/menu/almond-croissant.jpg'),
('Butter Croissant', 'makanan', 18000, 'Croissant butter klasik', '/images/menu/butter-croissant.jpg'),
('Pain au Chocolate Croissant', 'makanan', 21000, 'Croissant dengan cokelat', '/images/menu/pain-au-chocolate.jpg'),
('Croissant Almond Choco', 'makanan', 30000, 'Croissant almond dengan cokelat', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'),
('Croissant Strawberry Supreme', 'makanan', 35000, 'Croissant dengan strawberry premium', 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400'),
('Croissant Creamcheese Bruleé', 'makanan', 35000, 'Croissant cream cheese dengan bruleé', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'),
('Croissant Cheese Madness', 'makanan', 32000, 'Croissant dengan keju melimpah', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'),
('Croissant Smoked Beef & Cheese', 'makanan', 38000, 'Croissant dengan smoked beef dan keju', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'),
('Cookies Croissant', 'makanan', 38000, 'Croissant dengan cookies', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400');

-- SWEET TREATS
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Basque Burnt Cheese Cake', 'makanan', 35000, 'Basque burnt cheese cake per slice', '/images/menu/basque-cheesecake.jpg'),
('Brownies', 'makanan', 20000, 'Brownies cokelat lembut', '/images/menu/brownies.jpg'),
('Brownies Byts', 'makanan', 27000, 'Brownies bites ukuran kecil', '/images/menu/brownies.jpg'),
('Cookies', 'makanan', 18000, 'Cookies renyah', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400'),
('Pistachio Kunafa Brownies', 'makanan', 45000, 'Brownies pistachio dengan kunafa', 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400'),
('Classic Tiramisu', 'makanan', 38000, 'Tiramisu klasik per box (weekend only)', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400');

-- MAIN COURSE - WESTERN
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Spaghetti Aglio Olio', 'makanan', 38000, 'Spaghetti dengan minyak bawang putih', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400'),
('Spaghetti Bolognese', 'makanan', 38000, 'Spaghetti dengan saus daging cincang', '/images/menu/spaghetti-bolognese.jpg'),
('Chicken Cordon Bleu', 'makanan', 39000, 'Ayam gulung dengan ham dan keju', 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400');

-- MAIN COURSE - ASIAN CUISINE
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Chicken Salted Egg', 'makanan', 35000, 'Ayam dengan saus telur asin', '/images/menu/chicken-salted-egg.jpg'),
('Nasi Jeruk Kulit Crispy', 'makanan', 33000, 'Nasi dengan ayam jeruk kulit crispy', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
('Nasi Sapi Sambal Matah', 'makanan', 35000, 'Nasi dengan sapi sambal matah', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
('Mie Goreng Khas RJ', 'makanan', 27000, 'Mie goreng spesial Rich and Jane', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400'),
('Nasi Chicken Mozarella', 'makanan', 35000, 'Nasi ayam dengan keju mozarella', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
('Nasi Goreng Chicken Katsu', 'makanan', 35000, 'Nasi goreng dengan chicken katsu', '/images/menu/nasi-goreng-chicken-katsu.jpg'),
('Nasi Goreng Tomyam Seafood', 'makanan', 37000, 'Nasi goreng tomyam dengan seafood', '/images/menu/nasi-goreng-seafood.jpg'),
('Nasi Gila', 'makanan', 32000, 'Nasi goreng pedas dengan berbagai topping', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
('Nasi Beef Teriyaki', 'makanan', 39000, 'Nasi dengan beef teriyaki', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
('Katsu Curry Rice', 'makanan', 39000, 'Nasi kari dengan chicken katsu', '/images/menu/nasi-goreng-chicken-katsu.jpg');

-- BREAKFAST
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Omellete French Fries', 'makanan', 25000, 'Omelet dengan kentang goreng', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400'),
('Mushroom Croissant', 'makanan', 36000, 'Croissant dengan mushroom', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400');

-- KIDS MEAL
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Chicken Katsu + Rice', 'makanan', 30000, 'Menu anak: Chicken katsu dengan nasi', '/images/menu/nasi-goreng-chicken-katsu.jpg'),
('Fish n Chips (Kids)', 'makanan', 30000, 'Menu anak: Fish and chips', 'https://images.unsplash.com/photo-1580217593608-61931cefc821?w=400');

-- ===================================
-- INSERT MENU MINUMAN
-- ===================================

-- COFFEE - MANUAL BREW ARABICA BEAN
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Vietnam Drip', 'minuman', 28000, 'Kopi Vietnam drip', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'),
('V60', 'minuman', 32000, 'Manual brew V60', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'),
('French Press', 'minuman', 32000, 'Manual brew French Press', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'),
('Syphon', 'minuman', 32000, 'Manual brew Syphon', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'),
('Aeropress', 'minuman', 32000, 'Manual brew Aeropress', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'),
('Japanese', 'minuman', 32000, 'Manual brew Japanese style', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400');

-- COFFEE - BLACK (hot/ice)
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Americano', 'minuman', 23000, 'Espresso dengan air panas (hot/ice)', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'),
('Long Black', 'minuman', 23000, 'Long black coffee (hot/ice)', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400');

-- COFFEE - WHITE (hot/ice)
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Cappuccino', 'minuman', 25000, 'Espresso dengan susu dan foam (hot/ice)', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400'),
('Flat White', 'minuman', 25000, 'Espresso dengan microfoam susu (hot/ice)', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400'),
('Vietnamese Iced Coffee', 'minuman', 25000, 'Es kopi susu Vietnam', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400');

-- COFFEE - LATTE (hot/ice)
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Caffe Latte', 'minuman', 28000, 'Espresso dengan susu (hot/ice)', '/images/menu/caffe-latte.jpg'),
('Caramel Latte', 'minuman', 28000, 'Latte dengan caramel (hot/ice)', '/images/menu/kopi-gula-aren.jpg'),
('Butterscotch', 'minuman', 28000, 'Latte dengan butterscotch (hot/ice)', '/images/menu/kopi-gula-aren.jpg'),
('Biscoff', 'minuman', 28000, 'Latte dengan biscoff (hot/ice)', '/images/menu/kopi-gula-aren.jpg'),
('Caramel Macchiato', 'minuman', 28000, 'Caramel macchiato (hot/ice)', 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400'),
('Salted Caramel', 'minuman', 28000, 'Latte salted caramel (hot/ice)', 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400');

-- COFFEE - ADDITIONAL
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Oat Milk', 'minuman', 9000, 'Tambahan oat milk', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'),
('Espresso Shot', 'minuman', 11000, 'Tambahan espresso shot', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400');

-- COFFEE - MANMADE (hot/ice)
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Kopi Cheesecake', 'minuman', 29000, 'Kopi dengan rasa cheesecake (ice)', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400'),
('Kopi Gula Aren', 'minuman', 25000, 'Kopi dengan gula aren (ice)', '/images/menu/kopi-gula-aren.jpg'),
('Butterscotch Creamy Seasalt', 'minuman', 33000, 'Butterscotch dengan creamy seasalt', 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400'),
('Cocoberry Americano', 'minuman', 30000, 'Americano dengan cocoberry', '/images/menu/tropical-paradise.jpg'),
('Coffee Cream', 'minuman', 25000, 'Kopi dengan cream', 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400'),
('Matcha Kyoto', 'minuman', 30000, 'Matcha premium Kyoto', '/images/menu/matcha-latte.jpg');

-- COFFEE - OATSIDE SERIES
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Kopi Gula Aren (Oatside)', 'minuman', 30000, 'Kopi gula aren dengan oat milk', '/images/menu/kopi-gula-aren.jpg'),
('Kopi Cheesecake (Oatside)', 'minuman', 35000, 'Kopi cheesecake dengan oat milk', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400'),
('Kopi Biscoff (Oatside)', 'minuman', 35000, 'Kopi biscoff dengan oat milk', '/images/menu/kopi-gula-aren.jpg'),
('Salted Caramel (Oatside)', 'minuman', 35000, 'Salted caramel dengan oat milk', 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400');

-- NON COFFEE
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Squash Lychee', 'minuman', 25000, 'Squash rasa lychee', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Squash Lemon', 'minuman', 25000, 'Squash rasa lemon', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Squash Orange', 'minuman', 25000, 'Squash rasa orange', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400'),
('Yakult Grape', 'minuman', 25000, 'Yakult dengan anggur', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Yakult Lychee', 'minuman', 25000, 'Yakult dengan lychee', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Yakult Strawberry', 'minuman', 25000, 'Yakult dengan strawberry', 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400'),
('Strawberry Cheesecake', 'minuman', 30000, 'Minuman rasa strawberry cheesecake', 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400'),
('Milkshake Chocolate', 'minuman', 28000, 'Milkshake rasa cokelat', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
('Milkshake Vanilla', 'minuman', 28000, 'Milkshake rasa vanilla', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
('Milkshake Strawberry', 'minuman', 28000, 'Milkshake rasa strawberry', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'),
('Matcha', 'minuman', 33000, 'Matcha premium', '/images/menu/matcha-latte.jpg'),
('Chocolate', 'minuman', 33000, 'Hot chocolate premium', 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=400'),
('Air Mineral', 'minuman', 8000, 'Air mineral botol', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400');

-- TEA
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Peach Tea', 'minuman', 26000, 'Teh dengan rasa peach', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Lychee Tea', 'minuman', 26000, 'Teh dengan rasa lychee', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Lemon Tea', 'minuman', 26000, 'Teh dengan lemon segar', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Black Earl Grey', 'minuman', 30000, 'Teh black earl grey', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Chamomile', 'minuman', 30000, 'Teh chamomile', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('English Breakfast', 'minuman', 30000, 'Teh English breakfast', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Peppermint Infusion', 'minuman', 30000, 'Teh peppermint', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400');

-- BARISTA'S SIGNATURE
INSERT INTO menu_items (name, category, price, description, image_url) VALUES
('Phantom', 'minuman', 35000, 'Espresso, Chocolate, Caramel - Signature', 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400'),
('Siberian Green', 'minuman', 35000, 'Espresso, Green Apple, Sugarcane - Signature', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'),
('Tropical Paradise', 'minuman', 35000, 'Mixfruit, Mintleaf, Lemonade - Signature', '/images/menu/tropical-paradise.jpg'),
('Sparkling Berry Sour', 'minuman', 35000, 'Blacktea, Cranberries, Mixed Fruit - Signature', '/images/menu/tropical-paradise.jpg'),
('Green Carribean', 'minuman', 35000, 'Kiwi, Lemonade, Elderflower - Signature', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400');