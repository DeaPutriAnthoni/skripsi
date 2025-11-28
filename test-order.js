// Test order endpoint directly
const http = require('http');

const orderData = {
  table_number: 2,
  items: [
    { menu_item_id: 1, quantity: 2 },
    { menu_item_id: 2, quantity: 1 }
  ]
};

const postData = JSON.stringify(orderData);

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/orders/order',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🧪 Testing order endpoint...');
console.log('Order data:', orderData);

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed JSON:', jsonData);
    } catch (e) {
      console.log('Not valid JSON');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();