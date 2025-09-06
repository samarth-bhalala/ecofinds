import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Set environment variables
process.env.JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production';
process.env.JWT_EXPIRES_IN = '7d';

const testLogin = async () => {
  try {
    console.log('🔍 Testing login process...');
    
    // Test database connection
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'eco_finds_db'
    });
    console.log('✅ Database connected');
    
    // Test user lookup
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      ['john@example.com']
    );
    
    if (users.length === 0) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:', users[0].username);
    
    // Test password verification
    const user = users[0];
    const isPasswordValid = await bcrypt.compare('password123', user.password);
    console.log('✅ Password valid:', isPasswordValid);
    
    if (isPasswordValid) {
      // Test JWT generation
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      console.log('✅ JWT token generated:', token.substring(0, 50) + '...');
      
      console.log('🎉 Login test successful!');
      console.log('User data:', {
        id: user.id,
        username: user.username,
        email: user.email,
        display_name: user.full_name
      });
    }
    
    await connection.end();
  } catch (error) {
    console.error('❌ Login test failed:', error.message);
  }
};

testLogin();
