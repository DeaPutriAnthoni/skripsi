const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/menu',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`📡 Status: ${res.statusCode}`);
  console.log(`📋 Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log(`✅ Success: ${response.success}`);
      console.log(`📊 Total items: ${response.data ? response.data.length : 0}`);
      
      if (response.data && response.data.length > 0) {
        console.log('\n🔍 Sample items:');
        response.data.slice(0, 3).forEach(item => {
          console.log(`  - ${item.name}: ${item.image_url}`);
        });
      }
    } catch (err) {
      console.log('❌ Parse error:', err.message);
      console.log('📄 Raw response:', data.substring(0, 500));
    }
  });
});

req.on('error', (err) => {
  console.log('❌ Request error:', err.message);
});

req.end();