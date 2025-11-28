// Performance Summary
async function performanceSummary() {
    console.log('📊 Performance Summary Report\n');
    console.log('=' .repeat(50));

    // Test database performance
    console.log('🗄️ Database Performance:');
    const startDB = Date.now();
    const response = await fetch('http://localhost:3000/api/menu');
    const data = await response.json();
    const dbTime = Date.now() - startDB;
    console.log(`   • Menu Load Time: ${dbTime}ms`);
    console.log(`   • Total Menu Items: ${data.count}`);
    console.log(`   • Items per Second: ${(data.count / (dbTime / 1000)).toFixed(0)}`);

    // Test cache performance
    console.log('\n🚀 Cache Performance:');
    const startCache = Date.now();
    await fetch('http://localhost:3000/api/menu');
    const cacheTime = Date.now() - startCache;
    console.log(`   • Cached Load Time: ${cacheTime}ms`);
    console.log(`   • Speed Improvement: ${((dbTime - cacheTime) / dbTime * 100).toFixed(1)}%`);

    // Get health stats
    const healthResponse = await fetch('http://localhost:3000/api/health');
    const healthData = await healthResponse.json();
    
    console.log('\n📈 Cache Statistics:');
    console.log(`   • Menu Cache Hits: ${healthData.cache.menu.hits}`);
    console.log(`   • Menu Cache Misses: ${healthData.cache.menu.misses}`);
    console.log(`   • Cache Hit Ratio: ${((healthData.cache.menu.hits / (healthData.cache.menu.hits + healthData.cache.menu.misses)) * 100).toFixed(1)}%`);
    console.log(`   • Memory Usage: ${(healthData.cache.menu.vsize / 1024).toFixed(2)} KB`);

    console.log('\n🌐 API Response Times:');
    const endpoints = [
        '/api/health',
        '/api/menu',
        '/api/menu?category=makanan',
        '/api/orders'
    ];

    for (const endpoint of endpoints) {
        const start = Date.now();
        await fetch(`http://localhost:3000${endpoint}`);
        const time = Date.now() - start;
        console.log(`   • ${endpoint}: ${time}ms`);
    }

    console.log('\n' + '=' .repeat(50));
    console.log('✅ Performance Test Completed Successfully!');
}

performanceSummary();