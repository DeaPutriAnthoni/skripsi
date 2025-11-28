const fs = require('fs');
const mysql = require('mysql2');

// Read SQL file
const sql = fs.readFileSync('update-menu-images.sql', 'utf8');

// Split by semicolon and filter empty statements
const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

console.log('🔧 Executing SQL statements...\n');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rich_jane_coffee'
});

let executed = 0;

function executeNext() {
  if (executed >= statements.length) {
    console.log('\n✨ All SQL statements executed!');
    console.log('🔄 Please refresh your browser (Ctrl+F5)');
    conn.end();
    return;
  }
  
  const statement = statements[executed].trim();
  if (!statement) {
    executed++;
    executeNext();
    return;
  }
  
  conn.query(statement, (err, result) => {
    if (err) {
      console.log(`❌ Error: ${err.message}`);
    } else if (statement.startsWith('UPDATE')) {
      const menuName = statement.match(/WHERE name = '([^']+)'/);
      if (menuName) {
        const affected = result.affectedRows;
        if (affected > 0) {
          console.log(`✅ Updated: ${menuName[1]}`);
        } else {
          console.log(`⚠️  Not found: ${menuName[1]}`);
        }
      }
    } else if (statement.startsWith('SELECT')) {
      console.log('\n📋 Current Status:');
      if (result && result.length > 0) {
        result.forEach(row => {
          console.log(`📸 ${row.name}: ${row.image_url}`);
        });
      }
    }
    
    executed++;
    setTimeout(executeNext, 100); // Small delay between statements
  });
}

// Start execution
executeNext();