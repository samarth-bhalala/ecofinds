# Eco Finds Recycled Hub - Setup Instructions

## Prerequisites

1. **XAMPP** - Download and install from https://www.apachefriends.org/
2. **Node.js** - Download and install from https://nodejs.org/ (version 16 or higher)
3. **Git** - For version control

## Database Setup (XAMPP)

1. **Start XAMPP Services:**
   - Open XAMPP Control Panel
   - Start **Apache** and **MySQL** services
   - Make sure both services are running (green status)

2. **Access phpMyAdmin:**
   - Open your browser and go to `http://localhost/phpmyadmin`
   - The database will be created automatically when you start the backend server

## Project Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 3. Environment Configuration

The backend uses the following default database settings (in `backend/.env`):
- Host: localhost
- User: root
- Password: (empty - default XAMPP setup)
- Database: eco_finds_db
- Port: 3306

If your XAMPP MySQL has a different password, update the `DB_PASSWORD` in `backend/.env`.

### 4. Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

## API Endpoints

The backend provides the following API endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with pagination and filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/user/:userId` - Get user's products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category

### Favorites
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites/:productId` - Add to favorites
- `DELETE /api/favorites/:productId` - Remove from favorites

### Messages
- `GET /api/messages/conversations` - Get user's conversations
- `GET /api/messages/:userId` - Get messages with specific user
- `POST /api/messages` - Send message
- `GET /api/messages/unread/count` - Get unread message count

## Database Schema

The application automatically creates the following tables:

1. **users** - User accounts and profiles
2. **categories** - Product categories
3. **products** - Product listings
4. **favorites** - User's favorite products
5. **messages** - User-to-user messaging

## Default Categories

The system comes with these default categories:
- Electronics
- Furniture
- Clothing
- Books
- Sports
- Home & Garden
- Toys & Games
- Automotive

## Troubleshooting

### Database Connection Issues
1. Make sure XAMPP MySQL is running
2. Check if the database credentials in `backend/.env` match your XAMPP setup
3. Verify MySQL is running on port 3306

### Port Conflicts
- Backend runs on port 5000 (change in `backend/.env` if needed)
- Frontend runs on port 5173 (change in `frontend/vite.config.ts` if needed)

### CORS Issues
- Make sure the `FRONTEND_URL` in `backend/.env` matches your frontend URL

## Production Deployment

For production deployment:

1. Update environment variables in `backend/.env`
2. Set `NODE_ENV=production`
3. Use a production database (not XAMPP)
4. Build the frontend: `cd frontend && npm run build`
5. Serve the built files with a web server

## Features

- ✅ User authentication (register/login)
- ✅ Product listing and management
- ✅ Category-based browsing
- ✅ Search and filtering
- ✅ User profiles
- ✅ Favorites system
- ✅ Messaging between users
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Image upload support
- ✅ Pagination
- ✅ Security middleware
