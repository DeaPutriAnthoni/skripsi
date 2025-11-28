// Test Script untuk Rich Jane Coffee System
// Using built-in fetch (Node 18+)

const API_URL = 'http://localhost:8080/api';

async function testAPI() {
    console.log('🧪 Testing Rich Jane Coffee API...\n');

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing Health Endpoint...');
        const healthResponse = await fetch(`${API_URL}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health Status:', healthData.status);
        console.log('📊 Cache Stats:', JSON.stringify(healthData.cache, null, 2));
        console.log('');

        // Test 2: Get Menu (with caching)
        console.log('2️⃣ Testing Menu Endpoint...');
        const menuResponse = await fetch(`${API_URL}/menu`);
        const menuData = await menuResponse.json();
        console.log('✅ Menu Items:', menuData.count);
        console.log('📦 Cached:', menuData.cached);
        console.log('');

        // Test 3: Get Menu by Category
        console.log('3️⃣ Testing Menu by Category...');
        const makananResponse = await fetch(`${API_URL}/menu?category=makanan`);
        const makananData = await makananResponse.json();
        console.log('✅ Makanan Items:', makananData.count);
        console.log('📦 Cached:', makananData.cached);
        console.log('');

        // Test 4: Create Order
        console.log('4️⃣ Testing Order Creation...');
        const orderData = {
            table_number: 1,
            items: [
                { menu_item_id: 1, quantity: 2 },
                { menu_item_id: 2, quantity: 1 }
            ]
        };
        
        const createResponse = await fetch(`${API_URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        const createResult = await createResponse.json();
        
        if (createResult.success) {
            console.log('✅ Order Created:', createResult.data.order_id);
            console.log('💰 Total Amount:', createResult.data.total_amount);
            
            const orderId = createResult.data.order_id;
            
            // Test 5: Get Order Details
            console.log('\n5️⃣ Testing Order Details...');
            const orderResponse = await fetch(`${API_URL}/order/${orderId}`);
            const orderDetail = await orderResponse.json();
            console.log('✅ Order Details Loaded');
            console.log('📋 Items:', orderDetail.data.items.length);
            
            // Test 6: Get Active Orders
            console.log('\n6️⃣ Testing Active Orders...');
            const ordersResponse = await fetch(`${API_URL}/orders`);
            const ordersData = await ordersResponse.json();
            console.log('✅ Active Orders:', ordersData.count);
            console.log('📦 Cached:', ordersData.cached);
            
            // Test 7: Update Status
            console.log('\n7️⃣ Testing Status Update...');
            const itemId = orderDetail.data.items[0].order_item_id;
            const updateResponse = await fetch(`${API_URL}/order/${orderId}/item/${itemId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'orderan_selesai' })
            });
            const updateResult = await updateResponse.json();
            console.log('✅ Status Updated:', updateResult.message);
            
            // Test 8: QR Code Generation
            console.log('\n8️⃣ Testing QR Code Generation...');
            const qrResponse = await fetch(`${API_URL}/qrcode/5`);
            const qrData = await qrResponse.json();
            console.log('✅ QR Code Generated for Table 5');
            console.log('🔗 URL:', qrData.data.url);
            
        } else {
            console.log('❌ Order Creation Failed:', createResult.message);
        }

        console.log('\n🎉 All API Tests Completed Successfully!');

    } catch (error) {
        console.error('❌ Test Failed:', error.message);
    }
}

// Run tests
testAPI();