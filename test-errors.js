// Test Error Handling
async function testErrorHandling() {
    console.log('🛡️ Testing Error Handling...\n');

    // Test 1: Invalid menu item
    console.log('1️⃣ Testing Invalid Menu Item:');
    try {
        const response = await fetch('http://localhost:3000/api/menu/99999');
        const data = await response.json();
        console.log('✅ Status:', response.status);
        console.log('📝 Message:', data.message);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }

    // Test 2: Invalid order data
    console.log('\n2️⃣ Testing Invalid Order Data:');
    try {
        const response = await fetch('http://localhost:3000/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ table_number: null, items: [] })
        });
        const data = await response.json();
        console.log('✅ Status:', response.status);
        console.log('📝 Message:', data.message);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }

    // Test 3: Invalid status update
    console.log('\n3️⃣ Testing Invalid Status Update:');
    try {
        const response = await fetch('http://localhost:3000/api/order/999/item/999/status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'invalid_status' })
        });
        const data = await response.json();
        console.log('✅ Status:', response.status);
        console.log('📝 Message:', data.message);
    } catch (error) {
        console.log('❌ Error:', error.message);
    }

    console.log('\n✅ Error Handling Tests Completed!');
}

testErrorHandling();