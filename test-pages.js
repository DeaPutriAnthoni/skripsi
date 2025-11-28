// Test All Pages Accessibility
async function testAllPages() {
    console.log('🌐 Testing All Pages Accessibility...\n');

    const pages = [
        { path: '/', name: 'Root API' },
        { path: '/menu.html', name: 'Menu Page' },
        { path: '/kitchen.html', name: 'Kitchen Display' },
        { path: '/qrcode.html', name: 'QR Generator' },
        { path: '/receipt.html?orderId=1', name: 'Receipt Page' }
    ];

    for (const page of pages) {
        try {
            const response = await fetch(`http://localhost:8080${page.path}`);
            const status = response.status;
            const contentType = response.headers.get('content-type');
            
            console.log(`${status === 200 ? '✅' : '❌'} ${page.name}:`);
            console.log(`   Status: ${status}`);
            console.log(`   Type: ${contentType || 'N/A'}`);
            
            if (status === 200) {
                console.log(`   URL: http://localhost:8080${page.path}`);
            }
            console.log('');
        } catch (error) {
            console.log(`❌ ${page.name}: Failed to load`);
            console.log(`   Error: ${error.message}\n`);
        }
    }

    // Test API endpoints
    console.log('🔌 Testing API Endpoints...\n');
    
    const endpoints = [
        { path: '/api/health', name: 'Health Check' },
        { path: '/api/menu', name: 'Menu API' },
        { path: '/api/menu?category=makanan', name: 'Menu by Category' },
        { path: '/api/orders', name: 'Active Orders' },
        { path: '/api/qrcode/1', name: 'QR Code API' }
    ];

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(`http://localhost:8080${endpoint.path}`);
            const data = await response.json();
            
            console.log(`${response.status === 200 ? '✅' : '❌'} ${endpoint.name}:`);
            console.log(`   Status: ${response.status}`);
            console.log(`   Success: ${data.success || 'N/A'}`);
            if (data.data) {
                console.log(`   Data: ${Array.isArray(data.data) ? data.data.length + ' items' : 'Object'}`);
            }
            console.log('');
        } catch (error) {
            console.log(`❌ ${endpoint.name}: Failed to load`);
            console.log(`   Error: ${error.message}\n`);
        }
    }

    console.log('🎉 Page Accessibility Test Completed!');
    console.log('\n📋 Manual Testing URLs:');
    pages.forEach(page => {
        console.log(`   • ${page.name}: http://localhost:8080${page.path}`);
    });
}

testAllPages();