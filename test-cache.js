// Test Caching Performance
async function testCaching() {
    console.log('🚀 Testing Caching Performance...\n');

    // Test menu caching
    console.log('1️⃣ First Menu Load (should be from database):');
    const start1 = Date.now();
    const response1 = await fetch('http://localhost:3000/api/menu');
    const data1 = await response1.json();
    const time1 = Date.now() - start1;
    console.log(`⏱️  Time: ${time1}ms | Cached: ${data1.cached}`);

    console.log('\n2️⃣ Second Menu Load (should be from cache):');
    const start2 = Date.now();
    const response2 = await fetch('http://localhost:3000/api/menu');
    const data2 = await response2.json();
    const time2 = Date.now() - start2;
    console.log(`⏱️  Time: ${time2}ms | Cached: ${data2.cached}`);
    
    const speedup = ((time1 - time2) / time1 * 100).toFixed(1);
    console.log(`🚀 Speedup: ${speedup}% faster!`);

    // Test health endpoint to see cache stats
    console.log('\n3️⃣ Cache Statistics:');
    const healthResponse = await fetch('http://localhost:3000/api/health');
    const healthData = await healthResponse.json();
    console.log('📊 Menu Cache:', healthData.cache.menu);
}

testCaching();