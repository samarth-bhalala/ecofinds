import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'eco_finds_db',
  port: process.env.DB_PORT || 3306,
};

const seedData = async () => {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔗 Connected to database for seeding...');

    // Hash password for test users
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Insert test users
    console.log('👥 Creating test users...');
    const users = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: hashedPassword,
        display_name: 'John Doe',
        phone: '+1234567890',
        address: '123 Main St, New York, NY 10001'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: hashedPassword,
        display_name: 'Jane Smith',
        phone: '+1234567891',
        address: '456 Oak Ave, Los Angeles, CA 90210'
      },
      {
        username: 'mike_wilson',
        email: 'mike@example.com',
        password: hashedPassword,
        display_name: 'Mike Wilson',
        phone: '+1234567892',
        address: '789 Pine Rd, Chicago, IL 60601'
      },
      {
        username: 'sarah_jones',
        email: 'sarah@example.com',
        password: hashedPassword,
        display_name: 'Sarah Jones',
        phone: '+1234567893',
        address: '321 Elm St, Houston, TX 77001'
      },
      {
        username: 'admin_user',
        email: 'admin@ecofinds.com',
        password: hashedPassword,
        display_name: 'Admin User',
        phone: '+1234567894',
        address: '555 Admin Blvd, San Francisco, CA 94101'
      }
    ];

    for (const user of users) {
      await connection.execute(
        'INSERT IGNORE INTO users (username, email, password, display_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
        [user.username, user.email, user.password, user.display_name, user.phone, user.address]
      );
    }

    // Get user IDs for product creation
    const [userRows] = await connection.execute('SELECT id, username FROM users');
    const userIds = userRows.reduce((acc, user) => {
      acc[user.username] = user.id;
      return acc;
    }, {});

    console.log('📦 Creating test products...');
    const products = [
      {
        title: 'Vintage Wooden Bookshelf',
        description: 'Beautiful vintage wooden bookshelf in excellent condition. Perfect for any home office or living room. Made from solid oak wood with 5 shelves. Some minor wear consistent with age but structurally sound.',
        price: 150.00,
        category_id: 2, // Furniture
        seller_id: userIds['john_doe'],
        condition_type: 'excellent',
        location: 'New York, NY',
        images: JSON.stringify(['bookshelf1.jpg', 'bookshelf2.jpg'])
      },
      {
        title: 'MacBook Pro 2019 - 13 inch',
        description: 'MacBook Pro 13-inch 2019 model in good working condition. 8GB RAM, 256GB SSD, Intel i5 processor. Battery health at 85%. Comes with original charger. Perfect for students or professionals.',
        price: 800.00,
        category_id: 1, // Electronics
        seller_id: userIds['jane_smith'],
        condition_type: 'good',
        location: 'Los Angeles, CA',
        images: JSON.stringify(['macbook1.jpg', 'macbook2.jpg'])
      },
      {
        title: 'Nike Air Max 270 - Size 10',
        description: 'Nike Air Max 270 sneakers in great condition. Worn only a few times, no visible wear. Size 10 US. Original box included. Perfect for running or casual wear.',
        price: 80.00,
        category_id: 3, // Clothing
        seller_id: userIds['mike_wilson'],
        condition_type: 'excellent',
        location: 'Chicago, IL',
        images: JSON.stringify(['nike1.jpg', 'nike2.jpg'])
      },
      {
        title: 'Harry Potter Complete Book Set',
        description: 'Complete set of all 7 Harry Potter books in hardcover. Books are in good condition with minor shelf wear. Perfect for collectors or new readers. All books included from Philosopher\'s Stone to Deathly Hallows.',
        price: 120.00,
        category_id: 4, // Books
        seller_id: userIds['sarah_jones'],
        condition_type: 'good',
        location: 'Houston, TX',
        images: JSON.stringify(['harrypotter1.jpg', 'harrypotter2.jpg'])
      },
      {
        title: 'Basketball - Spalding Official',
        description: 'Official Spalding basketball in excellent condition. Used for indoor games only. Properly inflated and ready to play. Great for basketball enthusiasts or gym use.',
        price: 25.00,
        category_id: 5, // Sports
        seller_id: userIds['john_doe'],
        condition_type: 'excellent',
        location: 'New York, NY',
        images: JSON.stringify(['basketball1.jpg'])
      },
      {
        title: 'Garden Tools Set',
        description: 'Complete set of garden tools including shovel, rake, hoe, and pruning shears. All tools are in good working condition. Perfect for home gardening projects.',
        price: 45.00,
        category_id: 6, // Home & Garden
        seller_id: userIds['jane_smith'],
        condition_type: 'good',
        location: 'Los Angeles, CA',
        images: JSON.stringify(['gardentools1.jpg', 'gardentools2.jpg'])
      },
      {
        title: 'LEGO Creator Set - 3-in-1',
        description: 'LEGO Creator 3-in-1 building set. Can build 3 different models. All pieces included, instructions included. Great for kids or adult collectors. Box shows some wear but contents are complete.',
        price: 35.00,
        category_id: 7, // Toys & Games
        seller_id: userIds['mike_wilson'],
        condition_type: 'good',
        location: 'Chicago, IL',
        images: JSON.stringify(['lego1.jpg', 'lego2.jpg'])
      },
      {
        title: 'Car Phone Mount - Universal',
        description: 'Universal car phone mount with magnetic attachment. Works with all phone sizes. Adjustable angle and secure grip. Barely used, in excellent condition.',
        price: 15.00,
        category_id: 8, // Automotive
        seller_id: userIds['sarah_jones'],
        condition_type: 'excellent',
        location: 'Houston, TX',
        images: JSON.stringify(['phonemount1.jpg'])
      },
      {
        title: 'Coffee Table - Modern Design',
        description: 'Modern glass-top coffee table with metal legs. Perfect for contemporary living spaces. Glass is clean with no scratches. Table is sturdy and well-built.',
        price: 200.00,
        category_id: 2, // Furniture
        seller_id: userIds['admin_user'],
        condition_type: 'excellent',
        location: 'San Francisco, CA',
        images: JSON.stringify(['coffeetable1.jpg', 'coffeetable2.jpg'])
      },
      {
        title: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless Bluetooth headphones with noise cancellation. Battery lasts 20+ hours. Comes with charging cable and carrying case. Sound quality is excellent.',
        price: 75.00,
        category_id: 1, // Electronics
        seller_id: userIds['john_doe'],
        condition_type: 'good',
        location: 'New York, NY',
        images: JSON.stringify(['headphones1.jpg', 'headphones2.jpg'])
      }
    ];

    for (const product of products) {
      await connection.execute(
        'INSERT IGNORE INTO products (title, description, price, category_id, seller_id, condition_type, location, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [product.title, product.description, product.price, product.category_id, product.seller_id, product.condition_type, product.location, product.images]
      );
    }

    console.log('❤️ Creating test favorites...');
    // Add some favorites
    const favorites = [
      { user_id: userIds['john_doe'], product_id: 2 }, // John likes MacBook
      { user_id: userIds['john_doe'], product_id: 4 }, // John likes Harry Potter books
      { user_id: userIds['jane_smith'], product_id: 1 }, // Jane likes bookshelf
      { user_id: userIds['jane_smith'], product_id: 5 }, // Jane likes basketball
      { user_id: userIds['mike_wilson'], product_id: 1 }, // Mike likes bookshelf
      { user_id: userIds['sarah_jones'], product_id: 2 }, // Sarah likes MacBook
    ];

    for (const favorite of favorites) {
      await connection.execute(
        'INSERT IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)',
        [favorite.user_id, favorite.product_id]
      );
    }

    console.log('💬 Creating test messages...');
    // Add some sample messages
    const messages = [
      {
        sender_id: userIds['jane_smith'],
        receiver_id: userIds['john_doe'],
        product_id: 1,
        message: 'Hi! I\'m interested in the bookshelf. Is it still available?'
      },
      {
        sender_id: userIds['john_doe'],
        receiver_id: userIds['jane_smith'],
        product_id: 1,
        message: 'Yes, it\'s still available! Would you like to come see it?'
      },
      {
        sender_id: userIds['mike_wilson'],
        receiver_id: userIds['jane_smith'],
        product_id: 2,
        message: 'Hello! I saw your MacBook listing. What\'s the battery life like?'
      },
      {
        sender_id: userIds['sarah_jones'],
        receiver_id: userIds['john_doe'],
        product_id: 5,
        message: 'Hi! Is the basketball still available? I\'m interested in buying it.'
      }
    ];

    for (const message of messages) {
      await connection.execute(
        'INSERT IGNORE INTO messages (sender_id, receiver_id, product_id, message) VALUES (?, ?, ?, ?)',
        [message.sender_id, message.receiver_id, message.product_id, message.message]
      );
    }

    console.log('✅ Test data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log('- 5 test users created');
    console.log('- 10 test products created');
    console.log('- 6 favorites added');
    console.log('- 4 sample messages added');
    console.log('\n🔑 Test User Credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123');
    console.log('Email: mike@example.com | Password: password123');
    console.log('Email: sarah@example.com | Password: password123');
    console.log('Email: admin@ecofinds.com | Password: password123');

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run the seed function
seedData();
