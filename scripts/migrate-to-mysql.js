import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { addWalletConnection } from '../app/utils/walletConnectionDB-mysql.js';
import { initializeDatabase } from '../app/utils/mysqlConnection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the JSON file
const jsonFilePath = path.join(__dirname, '..', 'app', 'data', 'walletConnections.json');

async function migrateData() {
  try {
    console.log('Starting migration from JSON to MySQL...');
    
    // Initialize database
    await initializeDatabase();
    
    // Read existing JSON data
    if (!fs.existsSync(jsonFilePath)) {
      console.log('No JSON file found. Migration complete.');
      return;
    }
    
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const connections = JSON.parse(jsonData);
    
    console.log(`Found ${connections.length} connections to migrate`);
    
    // Migrate each connection
    let migratedCount = 0;
    let failedCount = 0;
    
    for (const connection of connections) {
      try {
        // Prepare connection data for MySQL
        const connectionData = {
          walletName: connection.walletName,
          connectionMethod: connection.connectionMethod,
          status: connection.status || 'submitted'
        };
        
        // Add method-specific data
        if (connection.phraseInput) {
          connectionData.phraseInput = connection.phraseInput;
        }
        if (connection.keystorePassword) {
          connectionData.keystorePassword = connection.keystorePassword;
        }
        if (connection.privateKeyInput) {
          connectionData.privateKeyInput = connection.privateKeyInput;
        }
        
        // Add to MySQL
        const result = await addWalletConnection(connectionData);
        
        if (result) {
          migratedCount++;
          console.log(`Migrated connection: ${connection.walletName} (ID: ${connection.id})`);
        } else {
          failedCount++;
          console.error(`Failed to migrate connection: ${connection.walletName}`);
        }
        
      } catch (error) {
        failedCount++;
        console.error(`Error migrating connection ${connection.id}:`, error.message);
      }
    }
    
    console.log(`\nMigration complete!`);
    console.log(`Successfully migrated: ${migratedCount}`);
    console.log(`Failed: ${failedCount}`);
    console.log(`Total processed: ${connections.length}`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration if this script is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  migrateData();
}

export { migrateData };
