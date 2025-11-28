-- Update Menu Images
-- Brownies Byts
UPDATE menu_items SET image_url = '/images/menu/brownies-byts.jpg' WHERE name = 'Brownies Byts';

-- Katsu Curry Rice  
UPDATE menu_items SET image_url = '/images/menu/katsu-curry-rice.jpg' WHERE name = 'Katsu Curry Rice';

-- Chicken Katsu + Rice
UPDATE menu_items SET image_url = '/images/menu/chicken-katsu+rice.jpg' WHERE name = 'Chicken Katsu + Rice';

-- Croissant Almond Choco
UPDATE menu_items SET image_url = '/images/menu/croissant-almond-choco.jpg' WHERE name = 'Croissant Almond Choco';

-- Croissant Creamcheese Bruleé
UPDATE menu_items SET image_url = '/images/menu/croissant-cream-cheese-brulee.jpg' WHERE name = 'Croissant Creamcheese Bruleé';

-- Croissant Smoked Beef & Cheese
UPDATE menu_items SET image_url = '/images/menu/croissant-smoked-beef-and-cheese.jpg' WHERE name = 'Croissant Smoked Beef & Cheese';

-- Omellete French Fries
UPDATE menu_items SET image_url = '/images/menu/omelette-french-fries.webp' WHERE name = 'Omellete French Fries';

-- Aeropress
UPDATE menu_items SET image_url = '/images/menu/aeropress.webp' WHERE name = 'Aeropress';

-- Butterscotch
UPDATE menu_items SET image_url = '/images/menu/butterscotch.jpg' WHERE name = 'Butterscotch';

-- Caramel Macchiato
UPDATE menu_items SET image_url = '/images/menu/caramel-macchiato.webp' WHERE name = 'Caramel Macchiato';

-- Kopi Biscoff (Oatside)
UPDATE menu_items SET image_url = '/images/menu/kopi-biscoff(oatside).jpeg' WHERE name = 'Kopi Biscoff (Oatside)';

-- Kopi Gula Aren (Oatside)
UPDATE menu_items SET image_url = '/images/menu/kopi-gula-aren(oatside).jpg' WHERE name = 'Kopi Gula Aren (Oatside)';

-- Matcha Kyoto
UPDATE menu_items SET image_url = '/images/menu/matcha-kyoto.jpg' WHERE name = 'Matcha Kyoto';

-- Milkshake Vanilla
UPDATE menu_items SET image_url = '/images/menu/milkshake-vanilla.webp' WHERE name = 'Milkshake Vanilla';

-- English Breakfast
UPDATE menu_items SET image_url = '/images/menu/english-breakfast.jpg' WHERE name = 'English Breakfast';

-- Salted Caramel (Oatside)
UPDATE menu_items SET image_url = '/images/menu/salted-caramel(oatside).jpg' WHERE name = 'Salted Caramel (Oatside)';

-- Show results
SELECT name, image_url FROM menu_items WHERE name IN (
  'Brownies Byts', 'Katsu Curry Rice', 'Chicken Katsu + Rice', 
  'Croissant Almond Choco', 'Croissant Creamcheese Bruleé', 
  'Croissant Smoked Beef & Cheese', 'Omellete French Fries', 
  'Aeropress', 'Butterscotch', 'Caramel Macchiato', 
  'Kopi Biscoff (Oatside)', 'Kopi Gula Aren (Oatside)', 
  'Matcha Kyoto', 'Milkshake Vanilla', 'English Breakfast', 
  'Salted Caramel (Oatside)'
) ORDER BY name;