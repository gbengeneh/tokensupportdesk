import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'walletConnections.json');

// Ensure data directory exists
const dataDir = path.dirname(dataFilePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize empty array if file doesn't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
}

// Read all wallet connections
export function readWalletConnections() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading wallet connections:', error);
    return [];
  }
}

// Write wallet connections to file
export function writeWalletConnections(connections) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(connections, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing wallet connections:', error);
    return false;
  }
}

// Add a new wallet connection
export function addWalletConnection(connectionData) {
  const connections = readWalletConnections();
  const newConnection = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...connectionData,
    status: 'submitted'
  };
  
  connections.push(newConnection);
  
  if (writeWalletConnections(connections)) {
    return newConnection;
  }
  return null;
}

// Get all wallet connections sorted by timestamp (ascending)
export function getWalletConnectionsSorted() {
  const connections = readWalletConnections();
  return connections.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

// Get wallet connections by wallet name
export function getWalletConnectionsByWallet(walletName) {
  const connections = readWalletConnections();
  return connections
    .filter(conn => conn.walletName === walletName)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

// Clear all wallet connections (for testing/reset)
export function clearWalletConnections() {
  return writeWalletConnections([]);
}
