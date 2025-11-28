const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/menu',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const menuData = JSON.parse(data);
      const targetMenus = [
        'Basque Burnt Cheese Cake',
        'Fish n Chips', 
        'Pain au Chocolate Croissant',
        'Nasi Chicken Mozarella',
        'Nasi Goreng Tomyam Seafood',
        'Singkong Goreng Original'
      ];
      
      console.log('Menu items dan image URLs:\n');
      menuData.data.forEach(item => {
        if (targetMenus.includes(item.name)) {
          console.log(`✅ ${item.name}`);
          console.log(`   📸 ${item.image_url}\n`);
        }
      });
    } catch (err) {
      console.log('Error parsing JSON:', err.message);
      console.log('Raw response:', data.substring(0, 500));
    }
  });
});

req.on('error', (err) => {
  console.log('Error:', err.message);
});

req.end();