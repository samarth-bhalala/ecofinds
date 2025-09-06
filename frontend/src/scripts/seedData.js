import axios from 'axios';

// API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance for seed script
const seedAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store created user IDs for reference
let createdUsers = {};
let createdProducts = [];

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to create users
const createUsers = async () => {
  console.log('👥 Creating test users...');
  
  const users = [
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      display_name: 'John Doe',
      phone: '+1234567890',
      address: '123 Main St, New York, NY 10001'
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: 'password123',
      display_name: 'Jane Smith',
      phone: '+1234567891',
      address: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      username: 'mike_wilson',
      email: 'mike@example.com',
      password: 'password123',
      display_name: 'Mike Wilson',
      phone: '+1234567892',
      address: '789 Pine Rd, Chicago, IL 60601'
    },
    {
      username: 'sarah_jones',
      email: 'sarah@example.com',
      password: 'password123',
      display_name: 'Sarah Jones',
      phone: '+1234567893',
      address: '321 Elm St, Houston, TX 77001'
    },
    {
      username: 'admin_user',
      email: 'admin@ecofinds.com',
      password: 'password123',
      display_name: 'Admin User',
      phone: '+1234567894',
      address: '555 Admin Blvd, San Francisco, CA 94101'
    }
  ];

  for (const user of users) {
    try {
      const response = await seedAPI.post('/auth/register', user);
      console.log(`✅ Created user: ${user.username} (ID: ${response.data.user.id})`);
      createdUsers[user.username] = response.data.user.id;
      await delay(100); // Small delay between requests
    } catch (error) {
      if (error.response?.status === 409) {
        console.log(`⚠️ User ${user.username} already exists, skipping...`);
        // Try to get existing user ID by logging in
        try {
          const loginResponse = await seedAPI.post('/auth/login', {
            email: user.email,
            password: user.password
          });
          createdUsers[user.username] = loginResponse.data.user.id;
        } catch (loginError) {
          console.error(`❌ Could not get user ID for ${user.username}`);
        }
      } else {
        console.error(`❌ Error creating user ${user.username}:`, error.response?.data || error.message);
      }
    }
  }
};

// Function to create products
const createProducts = async () => {
  console.log('📦 Creating test products...');
  
  const products = [
    {
      title: 'Vintage Wooden Bookshelf',
      description: 'Beautiful vintage wooden bookshelf in excellent condition. Perfect for any home office or living room. Made from solid oak wood with 5 shelves. Some minor wear consistent with age but structurally sound.',
      price: 150.00,
      category_id: 2, // Furniture
      condition_type: 'excellent',
      location: 'New York, NY'
    },
    {
      title: 'MacBook Pro 2019 - 13 inch',
      description: 'MacBook Pro 13-inch 2019 model in good working condition. 8GB RAM, 256GB SSD, Intel i5 processor. Battery health at 85%. Comes with original charger. Perfect for students or professionals.',
      price: 800.00,
      category_id: 1, // Electronics
      condition_type: 'good',
      location: 'Los Angeles, CA'
    },
    {
      title: 'Nike Air Max 270 - Size 10',
      description: 'Nike Air Max 270 sneakers in great condition. Worn only a few times, no visible wear. Size 10 US. Original box included. Perfect for running or casual wear.',
      price: 80.00,
      category_id: 3, // Clothing
      condition_type: 'excellent',
      location: 'Chicago, IL'
    },
    {
      title: 'Harry Potter Complete Book Set',
      description: 'Complete set of all 7 Harry Potter books in hardcover. Books are in good condition with minor shelf wear. Perfect for collectors or new readers. All books included from Philosopher\'s Stone to Deathly Hallows.',
      price: 120.00,
      category_id: 4, // Books
      condition_type: 'good',
      location: 'Houston, TX'
    },
    {
      title: 'Basketball - Spalding Official',
      description: 'Official Spalding basketball in excellent condition. Used for indoor games only. Properly inflated and ready to play. Great for basketball enthusiasts or gym use.',
      price: 25.00,
      category_id: 5, // Sports
      condition_type: 'excellent',
      location: 'New York, NY'
    },
    {
      title: 'Garden Tools Set',
      description: 'Complete set of garden tools including shovel, rake, hoe, and pruning shears. All tools are in good working condition. Perfect for home gardening projects.',
      price: 45.00,
      category_id: 6, // Home & Garden
      condition_type: 'good',
      location: 'Los Angeles, CA'
    },
    {
      title: 'LEGO Creator Set - 3-in-1',
      description: 'LEGO Creator 3-in-1 building set. Can build 3 different models. All pieces included, instructions included. Great for kids or adult collectors. Box shows some wear but contents are complete.',
      price: 35.00,
      category_id: 7, // Toys & Games
      condition_type: 'good',
      location: 'Chicago, IL'
    },
    {
      title: 'Car Phone Mount - Universal',
      description: 'Universal car phone mount with magnetic attachment. Works with all phone sizes. Adjustable angle and secure grip. Barely used, in excellent condition.',
      price: 15.00,
      category_id: 8, // Automotive
      condition_type: 'excellent',
      location: 'Houston, TX'
    },
    {
      title: 'Coffee Table - Modern Design',
      description: 'Modern glass-top coffee table with metal legs. Perfect for contemporary living spaces. Glass is clean with no scratches. Table is sturdy and well-built.',
      price: 200.00,
      category_id: 2, // Furniture
      condition_type: 'excellent',
      location: 'San Francisco, CA'
    },
    {
      title: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless Bluetooth headphones with noise cancellation. Battery lasts 20+ hours. Comes with charging cable and carrying case. Sound quality is excellent.',
      price: 75.00,
      category_id: 1, // Electronics
      condition_type: 'good',
      location: 'New York, NY'
    }
  ];

  // Map products to sellers
  const sellerMap = [
    'john_doe', 'jane_smith', 'mike_wilson', 'sarah_jones', 'john_doe',
    'jane_smith', 'mike_wilson', 'sarah_jones', 'admin_user', 'john_doe'
  ];

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const sellerUsername = sellerMap[i];
    
    if (!createdUsers[sellerUsername]) {
      console.error(`❌ Seller ${sellerUsername} not found, skipping product: ${product.title}`);
      continue;
    }

    try {
      // Login as the seller to create the product
      const loginResponse = await seedAPI.post('/auth/login', {
        email: `${sellerUsername.split('_')[0]}@example.com`,
        password: 'password123'
      });
      
      const token = loginResponse.data.token;
      const authAPI = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const response = await authAPI.post('/products', product);
      console.log(`✅ Created product: ${product.title} (ID: ${response.data.id})`);
      createdProducts.push(response.data.id);
      await delay(200); // Small delay between requests
    } catch (error) {
      console.error(`❌ Error creating product ${product.title}:`, error.response?.data || error.message);
    }
  }
};

// Function to create favorites
const createFavorites = async () => {
  console.log('❤️ Creating test favorites...');
  
  const favorites = [
    { user_id: createdUsers['john_doe'], product_id: createdProducts[1] }, // John likes MacBook
    { user_id: createdUsers['john_doe'], product_id: createdProducts[3] }, // John likes Harry Potter books
    { user_id: createdUsers['jane_smith'], product_id: createdProducts[0] }, // Jane likes bookshelf
    { user_id: createdUsers['jane_smith'], product_id: createdProducts[4] }, // Jane likes basketball
    { user_id: createdUsers['mike_wilson'], product_id: createdProducts[0] }, // Mike likes bookshelf
    { user_id: createdUsers['sarah_jones'], product_id: createdProducts[1] }, // Sarah likes MacBook
  ];

  for (const favorite of favorites) {
    if (!favorite.user_id || !favorite.product_id) {
      console.error('❌ Invalid favorite data, skipping...');
      continue;
    }

    try {
      // Login as the user to add favorite
      const userEmail = Object.keys(createdUsers).find(username => 
        createdUsers[username] === favorite.user_id
      );
      
      if (!userEmail) {
        console.error('❌ User not found for favorite');
        continue;
      }

      const loginResponse = await seedAPI.post('/auth/login', {
        email: `${userEmail.split('_')[0]}@example.com`,
        password: 'password123'
      });
      
      const token = loginResponse.data.token;
      const authAPI = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      await authAPI.post(`/favorites/${favorite.product_id}`);
      console.log(`✅ Added favorite: User ${favorite.user_id} → Product ${favorite.product_id}`);
      await delay(100);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log(`⚠️ Favorite already exists, skipping...`);
      } else {
        console.error(`❌ Error creating favorite:`, error.response?.data || error.message);
      }
    }
  }
};

// Function to create messages
const createMessages = async () => {
  console.log('💬 Creating test messages...');
  
  const messages = [
    {
      sender_id: createdUsers['jane_smith'],
      receiver_id: createdUsers['john_doe'],
      product_id: createdProducts[0],
      message: 'Hi! I\'m interested in the bookshelf. Is it still available?'
    },
    {
      sender_id: createdUsers['john_doe'],
      receiver_id: createdUsers['jane_smith'],
      product_id: createdProducts[0],
      message: 'Yes, it\'s still available! Would you like to come see it?'
    },
    {
      sender_id: createdUsers['mike_wilson'],
      receiver_id: createdUsers['jane_smith'],
      product_id: createdProducts[1],
      message: 'Hello! I saw your MacBook listing. What\'s the battery life like?'
    },
    {
      sender_id: createdUsers['sarah_jones'],
      receiver_id: createdUsers['john_doe'],
      product_id: createdProducts[4],
      message: 'Hi! Is the basketball still available? I\'m interested in buying it.'
    }
  ];

  for (const message of messages) {
    if (!message.sender_id || !message.receiver_id || !message.product_id) {
      console.error('❌ Invalid message data, skipping...');
      continue;
    }

    try {
      // Login as the sender to send message
      const senderEmail = Object.keys(createdUsers).find(username => 
        createdUsers[username] === message.sender_id
      );
      
      if (!senderEmail) {
        console.error('❌ Sender not found for message');
        continue;
      }

      const loginResponse = await seedAPI.post('/auth/login', {
        email: `${senderEmail.split('_')[0]}@example.com`,
        password: 'password123'
      });
      
      const token = loginResponse.data.token;
      const authAPI = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      await authAPI.post('/messages', {
        receiver_id: message.receiver_id,
        product_id: message.product_id,
        message: message.message
      });
      
      console.log(`✅ Sent message: ${senderEmail} → User ${message.receiver_id}`);
      await delay(100);
    } catch (error) {
      console.error(`❌ Error creating message:`, error.response?.data || error.message);
    }
  }
};

// Main seed function
const seedData = async () => {
  console.log('🌱 Starting frontend seed data process...');
  console.log('⚠️  Make sure your backend server is running on http://localhost:5000');
  
  try {
    // Test API connection
    await seedAPI.get('/categories');
    console.log('✅ Backend API connection successful');
    
    // Create data in sequence
    await createUsers();
    await delay(500);
    
    await createProducts();
    await delay(500);
    
    await createFavorites();
    await delay(500);
    
    await createMessages();
    
    console.log('\n✅ Frontend seed data completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- ${Object.keys(createdUsers).length} test users created`);
    console.log(`- ${createdProducts.length} test products created`);
    console.log('- Test favorites and messages added');
    console.log('\n🔑 Test User Credentials:');
    console.log('Email: john@example.com | Password: password123');
    console.log('Email: jane@example.com | Password: password123');
    console.log('Email: mike@example.com | Password: password123');
    console.log('Email: sarah@example.com | Password: password123');
    console.log('Email: admin@ecofinds.com | Password: password123');
    
  } catch (error) {
    console.error('❌ Seed data process failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Make sure your backend server is running on http://localhost:5000');
    }
    throw error;
  }
};

// Run the seed function
seedData().catch(console.error);

export { seedData };
