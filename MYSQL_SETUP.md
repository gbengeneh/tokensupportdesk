# MySQL Database Setup Guide

This guide will help you set up MySQL for the Token Support Desk application.

## Prerequisites

1. **MySQL Server** installed on your system
2. **Node.js** and **npm** installed

## Installation Steps

### 1. Install MySQL Server

**Windows:**
- Download MySQL Installer from https://dev.mysql.com/downloads/installer/
- Follow the installation wizard
- Note down your root password

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 2. Create Database

Connect to MySQL and create the database:

```sql
mysql -u root -p

CREATE DATABASE tokensupportdesk;
USE tokensupportdesk;
```

### 3. Configure Environment Variables

Update the `.env.local` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_root_password
DB_NAME=tokensupportdesk
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Test Database Connection

The application will automatically initialize the database tables when it starts. You can also test the connection manually:

```bash
npm run dev
```

Check the console for database connection messages.

### 6. Migrate Existing Data (Optional)

If you have existing data in `app/data/walletConnections.json`, you can migrate it to MySQL:

```bash
npm run migrate:mysql
```

## Database Schema

The application uses the following table structure:

**wallet_connections** table:
- `id` VARCHAR(255) PRIMARY KEY
- `timestamp` DATETIME NOT NULL
- `walletName` VARCHAR(255) NOT NULL
- `connectionMethod` VARCHAR(50) NOT NULL
- `status` VARCHAR(50) DEFAULT 'submitted'
- `phraseInput` TEXT NULL
- `keystorePassword` VARCHAR(255) NULL
- `privateKeyInput` TEXT NULL
- `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

## Troubleshooting

### Connection Issues
- Verify MySQL server is running
- Check credentials in `.env.local`
- Ensure database exists

### Permission Issues
- Make sure your MySQL user has privileges on the database
- Grant privileges: `GRANT ALL PRIVILEGES ON tokensupportdesk.* TO 'username'@'localhost';`

### Port Conflicts
- MySQL default port is 3306
- Change port in `.env.local` if needed

## Development Notes

- The application uses connection pooling for better performance
- All database operations are asynchronous
- Error handling includes proper logging and graceful degradation

## Backup and Recovery

To backup your database:
```bash
mysqldump -u root -p tokensupportdesk > backup.sql
```

To restore from backup:
```bash
mysql -u root -p tokensupportdesk < backup.sql
```

## Security Considerations

- Never commit `.env.local` to version control
- Use strong passwords for database users
- Consider using a dedicated database user with limited privileges for production
