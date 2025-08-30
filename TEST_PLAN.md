# MySQL Implementation Test Plan

## Prerequisites
- MySQL server installed and running
- Database credentials configured in `.env.local`
- Dependencies installed: `npm install`

## Test Sequence

### 1. Database Connection Test
```bash
npm run test:mysql
```
**Expected Result:** Connection successful and database tables created

### 2. API Functionality Test
```bash
npm run test:api
```
**Expected Result:** All API operations work correctly with MySQL backend

### 3. Data Migration Test (Optional)
```bash
npm run migrate:mysql
```
**Expected Result:** Existing JSON data successfully migrated to MySQL

### 4. Full Application Test
```bash
npm run dev
```
**Test Steps:**
1. Open browser and navigate to the application
2. Test wallet connection functionality
3. Verify data is stored in MySQL instead of JSON file
4. Check API endpoints work correctly

## Manual API Testing

### Test POST Endpoint (Create Connection)
```bash
curl -X POST http://localhost:3000/api/wallet-connections \
  -H "Content-Type: application/json" \
  -d '{
    "walletName": "TestWallet",
    "connectionMethod": "phrase",
    "phraseInput": "test recovery phrase"
  }'
```

### Test GET Endpoint (Read Connections)
```bash
curl http://localhost:3000/api/wallet-connections
```

## Expected Test Results

### Database Level
- ✅ MySQL connection established
- ✅ `wallet_connections` table created with correct schema
- ✅ Data persists between application restarts
- ✅ Proper error handling for database connection issues

### API Level
- ✅ POST /api/wallet-connections creates new records
- ✅ GET /api/wallet-connections retrieves all records
- ✅ Data returned in correct JSON format
- ✅ Error responses for invalid requests

### Application Level
- ✅ Frontend can connect to backend API
- ✅ Wallet connection data stored in MySQL
- ✅ No breaking changes to existing functionality

## Troubleshooting Common Issues

### Connection Issues
- Verify MySQL server is running
- Check `.env.local` credentials
- Ensure database exists: `CREATE DATABASE tokensupportdesk;`

### Permission Issues
```sql
GRANT ALL PRIVILEGES ON tokensupportdesk.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
```

### Schema Issues
- Drop and recreate database if schema changes are needed
- Run migration script again if data structure changes

## Performance Testing
- Test with multiple concurrent connections
- Verify connection pooling works correctly
- Monitor database performance under load

## Security Testing
- Verify sensitive data (passwords, private keys) are handled properly
- Test SQL injection prevention
- Validate input sanitization

## Rollback Procedure
If MySQL implementation has issues, revert to JSON file storage:
1. Comment out MySQL imports in API route
2. Use original `walletConnectionDB.js` file
3. Remove mysql2 dependency from package.json
