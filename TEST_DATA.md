# Test Data Summary - Eco Finds Recycled Hub

## 🎯 Overview
The database has been populated with comprehensive test data for development and testing purposes.

## 👥 Test Users (5 users)

| Username | Email | Password | Full Name | Location |
|----------|-------|----------|-----------|----------|
| john_doe | john@example.com | password123 | John Doe | New York, NY |
| jane_smith | jane@example.com | password123 | Jane Smith | Los Angeles, CA |
| mike_wilson | mike@example.com | password123 | Mike Wilson | Chicago, IL |
| sarah_jones | sarah@example.com | password123 | Sarah Jones | Houston, TX |
| admin_user | admin@ecofinds.com | password123 | Admin User | San Francisco, CA |

## 📦 Test Products (10 products)

### Electronics
1. **MacBook Pro 2019 - 13 inch** - $800.00
   - Seller: Jane Smith
   - Condition: Good
   - Location: Los Angeles, CA

2. **Wireless Bluetooth Headphones** - $75.00
   - Seller: John Doe
   - Condition: Good
   - Location: New York, NY

### Furniture
3. **Vintage Wooden Bookshelf** - $150.00
   - Seller: John Doe
   - Condition: Excellent
   - Location: New York, NY

4. **Coffee Table - Modern Design** - $200.00
   - Seller: Admin User
   - Condition: Excellent
   - Location: San Francisco, CA

### Clothing
5. **Nike Air Max 270 - Size 10** - $80.00
   - Seller: Mike Wilson
   - Condition: Excellent
   - Location: Chicago, IL

### Books
6. **Harry Potter Complete Book Set** - $120.00
   - Seller: Sarah Jones
   - Condition: Good
   - Location: Houston, TX

### Sports
7. **Basketball - Spalding Official** - $25.00
   - Seller: John Doe
   - Condition: Excellent
   - Location: New York, NY

### Home & Garden
8. **Garden Tools Set** - $45.00
   - Seller: Jane Smith
   - Condition: Good
   - Location: Los Angeles, CA

### Toys & Games
9. **LEGO Creator Set - 3-in-1** - $35.00
   - Seller: Mike Wilson
   - Condition: Good
   - Location: Chicago, IL

### Automotive
10. **Car Phone Mount - Universal** - $15.00
    - Seller: Sarah Jones
    - Condition: Excellent
    - Location: Houston, TX

## ❤️ Test Favorites (6 favorites)

- John Doe → MacBook Pro, Harry Potter books
- Jane Smith → Vintage Bookshelf, Basketball
- Mike Wilson → Vintage Bookshelf
- Sarah Jones → MacBook Pro

## 💬 Test Messages (4 messages)

1. **Jane → John** (about Bookshelf): "Hi! I'm interested in the bookshelf. Is it still available?"
2. **John → Jane** (about Bookshelf): "Yes, it's still available! Would you like to come see it?"
3. **Mike → Jane** (about MacBook): "Hello! I saw your MacBook listing. What's the battery life like?"
4. **Sarah → John** (about Basketball): "Hi! Is the basketball still available? I'm interested in buying it."

## 🏷️ Categories (8 categories)

1. Electronics
2. Furniture
3. Clothing
4. Books
5. Sports
6. Home & Garden
7. Toys & Games
8. Automotive

## 🧪 Testing Scenarios

### Authentication Testing
- Login with any test user using their email and password "password123"
- All users have complete profiles with phone numbers and addresses

### Product Testing
- Browse products by category
- Search for specific items
- View product details
- Test pagination (10 products total)

### User Interaction Testing
- Add/remove favorites
- Send messages between users
- View user profiles
- Test product ownership (users can edit/delete their own products)

### API Testing Endpoints

#### Products
- `GET /api/products` - Returns all 10 products
- `GET /api/products/1` - Returns specific product details
- `GET /api/products?category=1` - Filter by Electronics category
- `GET /api/products?search=macbook` - Search functionality

#### Authentication
- `POST /api/auth/login` - Test with any user email + "password123"
- `GET /api/auth/profile` - Get user profile (requires authentication)

#### Categories
- `GET /api/categories` - Returns all 8 categories

#### Favorites
- `GET /api/favorites` - Returns user's favorites (requires authentication)
- `POST /api/favorites/1` - Add product to favorites
- `DELETE /api/favorites/1` - Remove from favorites

#### Messages
- `GET /api/messages/conversations` - Get user's conversations
- `GET /api/messages/2` - Get messages with specific user
- `POST /api/messages` - Send new message

## 🔄 Re-seeding Data

To refresh the test data, run:
```bash
cd backend
npm run seed
```

This will add the test data again (using INSERT IGNORE to avoid duplicates).

## 🗑️ Clearing Test Data

To clear all test data and start fresh:
```sql
-- Connect to your MySQL database and run:
DELETE FROM messages;
DELETE FROM favorites;
DELETE FROM products;
DELETE FROM users WHERE email LIKE '%@example.com' OR email = 'admin@ecofinds.com';
```

## 📱 Frontend Testing

With this test data, you can:
1. **Login** with any test user
2. **Browse products** across all categories
3. **Search and filter** products
4. **Add/remove favorites**
5. **Send messages** between users
6. **View user profiles**
7. **Test the complete user flow**

The test data provides a realistic marketplace environment with diverse products, active users, and sample interactions.
