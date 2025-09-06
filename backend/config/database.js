import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'eco_finds_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database and create tables
export const initializeDatabase = async () => {
  try {
    // First, create a connection without specifying the database
    const tempConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
    };
    
    const tempPool = mysql.createPool(tempConfig);
    const tempConnection = await tempPool.getConnection();
    
    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'eco_finds_db';
    await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    tempConnection.release();
    tempPool.end();
    
    // Now use the main pool with the database specified
    const connection = await pool.getConnection();
    
    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100),
        phone VARCHAR(20),
        address TEXT,
        profile_image VARCHAR(255),
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Create categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category_id INT,
        seller_id INT NOT NULL,
        condition_type ENUM('excellent', 'good', 'fair', 'poor') DEFAULT 'good',
        images JSON,
        location VARCHAR(100),
        is_available BOOLEAN DEFAULT TRUE,
        is_featured BOOLEAN DEFAULT FALSE,
        views_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
        FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    
    // Create favorites table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE KEY unique_favorite (user_id, product_id)
      )
    `);
    
    // Create messages table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        product_id INT,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
      )
    `);
    
    // Insert default categories
    const categories = [
      { name: 'Electronics', description: 'Electronic devices and accessories' },
      { name: 'Furniture', description: 'Home and office furniture' },
      { name: 'Clothing', description: 'Fashion and apparel' },
      { name: 'Books', description: 'Books and educational materials' },
      { name: 'Sports', description: 'Sports equipment and gear' },
      { name: 'Home & Garden', description: 'Home improvement and gardening' },
      { name: 'Toys & Games', description: 'Children toys and games' },
      { name: 'Automotive', description: 'Car parts and accessories' }
    ];
    
    for (const category of categories) {
      await connection.execute(
        'INSERT IGNORE INTO categories (name, description) VALUES (?, ?)',
        [category.name, category.description]
      );
    }
    
    connection.release();
    console.log('✅ Database tables created successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

export default pool;
