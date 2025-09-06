# Frontend Seed Data Script

This script populates the Eco Finds database with test data using the frontend API endpoints.

## Prerequisites

1. **Backend server must be running** on `http://localhost:5000`
2. **Database must be initialized** with proper tables
3. **Node.js dependencies installed** in the frontend directory

## Installation

First, install the required dependencies:

```bash
cd frontend
npm install
```

## Usage

### Run the seed script

```bash
npm run seed
```

This will:
- Create 5 test users
- Create 10 test products across different categories
- Add sample favorites
- Create sample messages between users

### Test User Credentials

After running the seed script, you can login with any of these accounts:

| Email | Password | Full Name | Location |
|-------|----------|-----------|----------|
| john@example.com | password123 | John Doe | New York, NY |
| jane@example.com | password123 | Jane Smith | Los Angeles, CA |
| mike@example.com | password123 | Mike Wilson | Chicago, IL |
| sarah@example.com | password123 | Sarah Jones | Houston, TX |
| admin@ecofinds.com | password123 | Admin User | San Francisco, CA |

## What Gets Created

### Users (5)
- Complete user profiles with phone numbers and addresses
- All users have the same password: `password123`

### Products (10)
- **Electronics**: MacBook Pro, Wireless Headphones
- **Furniture**: Vintage Bookshelf, Coffee Table
- **Clothing**: Nike Air Max 270
- **Books**: Harry Potter Complete Set
- **Sports**: Basketball
- **Home & Garden**: Garden Tools Set
- **Toys & Games**: LEGO Creator Set
- **Automotive**: Car Phone Mount

### Favorites (6)
- Cross-user favorites to test the favorites system
- Users can add/remove favorites from the frontend

### Messages (4)
- Sample conversations between users about products
- Tests the messaging system functionality

## Error Handling

The script includes comprehensive error handling:
- **Duplicate prevention**: Uses `INSERT IGNORE` equivalent behavior
- **Connection errors**: Checks if backend is running
- **Authentication errors**: Handles login failures gracefully
- **Rate limiting**: Includes delays between API calls

## Troubleshooting

### Backend Connection Error
```
❌ Seed data process failed: connect ECONNREFUSED 127.0.0.1:5000
💡 Make sure your backend server is running on http://localhost:5000
```

**Solution**: Start your backend server:
```bash
cd backend
npm start
```

### User Already Exists
```
⚠️ User john_doe already exists, skipping...
```

**Solution**: This is normal behavior. The script will use existing users.

### Database Not Initialized
```
❌ Error creating user: Table 'users' doesn't exist
```

**Solution**: Make sure your database tables are created. Run the backend server which should initialize the database automatically.

## Development Notes

- The script uses TypeScript with proper type definitions
- All API calls go through the same endpoints used by the frontend
- Authentication is handled automatically for protected endpoints
- The script can be run multiple times safely (idempotent)

## Integration with Backend Seed

This frontend seed script complements the backend seed script (`backend/scripts/seedData.js`). You can use either:

- **Backend seed**: Direct database insertion (faster, no API calls)
- **Frontend seed**: API-based insertion (tests the full stack)

Both scripts create the same test data, so you can use whichever approach fits your testing needs.
