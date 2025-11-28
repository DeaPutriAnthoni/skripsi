// Manual Testing Guide - Rich and Jane Coffee System
console.log('📋 MANUAL TESTING GUIDE');
console.log('========================\n');

console.log('🚀 STEP 1: Start Server');
console.log('Buka terminal baru dan jalankan:');
console.log('cd D:\\skripsi');
console.log('npm start');
console.log('Tunggu sampai muncul "✨ Server is ready to accept requests!"\n');

console.log('🌐 STEP 2: Test Frontend Pages (Buka di Browser)');
console.log('Copy paste URL berikut satu per satu di browser:\n');

const pages = [
    { url: 'http://localhost:8080/', desc: 'Root API Documentation' },
    { url: 'http://localhost:8080/api/docs', desc: 'Complete API Documentation' },
    { url: 'http://localhost:8080/api/health', desc: 'System Health Check' },
    { url: 'http://localhost:8080/menu.html?table=1', desc: 'Customer Menu Interface' },
    { url: 'http://localhost:8080/kitchen.html', desc: 'Kitchen Display System' },
    { url: 'http://localhost:8080/qrcode.html', desc: 'QR Code Generator' },
    { url: 'http://localhost:8080/receipt.html?orderId=1', desc: 'Digital Receipt (test)' }
];

pages.forEach((page, index) => {
    console.log(`${index + 1}. ${page.desc}:`);
    console.log(`   ${page.url}\n`);
});

console.log('🔌 STEP 3: Test API Endpoints (Buka di Browser)');
console.log('API endpoints untuk diuji:\n');

const endpoints = [
    { url: 'http://localhost:8080/api/menu', desc: 'Get All Menu Items' },
    { url: 'http://localhost:8080/api/menu?category=makanan', desc: 'Get Food Menu Only' },
    { url: 'http://localhost:8080/api/menu?category=minuman', desc: 'Get Drink Menu Only' },
    { url: 'http://localhost:8080/api/orders', desc: 'Get All Active Orders' },
    { url: 'http://localhost:8080/api/qrcode/1', desc: 'Generate QR Code for Table 1' },
    { url: 'http://localhost:8080/api/stats', desc: 'System Statistics' }
];

endpoints.forEach((endpoint, index) => {
    console.log(`${index + 1}. ${endpoint.desc}:`);
    console.log(`   ${endpoint.url}\n`);
});

console.log('🛒 STEP 4: Complete Customer Flow Test');
console.log('1. Buka: http://localhost:8080/menu.html?table=1');
console.log('2. Pilih beberapa item menu');
console.log('3. Klik "Add to Cart" untuk setiap item');
console.log('4. Klik icon cart untuk checkout');
console.log('5. Isi nama dan klik "Place Order"');
console.log('6. Catat Order ID dari receipt\n');

console.log('🍳 STEP 5: Kitchen Operations Test');
console.log('1. Buka: http://localhost:8080/kitchen.html');
console.log('2. Lihat order yang baru dibuat');
console.log('3. Klik "Selesai" untuk update status');
console.log('4. Klik "Diantar" untuk update status lagi');
console.log('5. Klik "Bayar" untuk menyelesaikan order\n');

console.log('📱 STEP 6: Mobile Responsiveness Test');
console.log('1. Buka browser di mode mobile (F12 → Mobile view)');
console.log('2. Test semua pages di ukuran mobile');
console.log('3. Pastikan touch-friendly interface\n');

console.log('⚠️  STEP 7: Error Handling Test');
console.log('Test URL berikut untuk error handling:\n');

const errorTests = [
    { url: 'http://localhost:8080/api/menu/999', desc: 'Invalid Menu ID' },
    { url: 'http://localhost:8080/api/order/999', desc: 'Invalid Order ID' },
    { url: 'http://localhost:8080/invalid-endpoint', desc: '404 Not Found' }
];

errorTests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.desc}:`);
    console.log(`   ${test.url}\n`);
});

console.log('✅ STEP 8: Performance Test');
console.log('1. Test loading speed semua pages');
console.log('2. Test cache functionality (reload same page)');
console.log('3. Test dengan multiple tabs\n');

console.log('📊 EXPECTED RESULTS:');
console.log('✓ All pages should load without errors');
console.log('✓ API responses should return JSON with success: true');
console.log('✓ Menu items should display with images and prices');
console.log('✓ Cart operations should work smoothly');
console.log('✓ Order creation should generate receipt');
console.log('✓ Kitchen display should update in real-time');
console.log('✓ QR codes should generate properly');
console.log('✓ Mobile interface should be responsive\n');

console.log('🔧 TROUBLESHOOTING:');
console.log('❌ "Gagal memuat menu" → Server belum berjalan, jalankan npm start');
console.log('❌ "Database connection failed" → Install MySQL dan import database.sql');
console.log('❌ "Connection refused" → Check port 8080, kill other processes');
console.log('❌ "404 Not Found" → Check URL spelling and file existence\n');

console.log('📝 TESTING CHECKLIST:');
console.log('□ Server starts without errors');
console.log('□ All frontend pages load correctly');
console.log('□ API endpoints return proper JSON');
console.log('□ Menu items display with categories');
console.log('□ Cart add/remove/update functions work');
console.log('□ Order creation generates receipt');
console.log('□ Kitchen display shows orders');
console.log('□ Status updates work correctly');
console.log('□ QR code generation works');
console.log('□ Mobile responsive design works');
console.log('□ Error handling shows proper messages');
console.log('□ Performance is acceptable (< 3 seconds)\n');

console.log('🎯 READY TO TEST!');
console.log('Start server and follow the steps above.');