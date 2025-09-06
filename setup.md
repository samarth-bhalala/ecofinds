# EcoFinds - Sustainable Marketplace

🌱 **EcoFinds** is a full-stack web application that promotes sustainable living by connecting buyers and sellers of pre-owned, recycled, and eco-friendly items. Built with modern technologies, it provides a seamless marketplace experience while contributing to environmental conservation.

## 🌟 Features

### For Buyers
- **Browse Products**: Explore thousands of pre-owned items across multiple categories
- **Advanced Search**: Filter by category, price range, location, and condition
- **Quality Verification**: All items are verified for authenticity and quality
- **Secure Transactions**: Safe payment processing and buyer protection
- **Community Reviews**: Read reviews from other eco-conscious users

### For Sellers
- **Easy Listing**: Simple process to list your pre-owned items
- **Category Management**: Organize items into relevant categories
- **Image Upload**: Multiple high-quality photos for better visibility
- **Price Suggestions**: AI-powered pricing recommendations
- **Seller Dashboard**: Track sales, manage listings, and view analytics

### Environmental Impact
- **Carbon Footprint Tracking**: See your environmental impact
- **Sustainability Metrics**: Track CO₂ savings and waste reduction
- **Eco-Friendly Badges**: Earn recognition for sustainable practices
- **Community Impact**: Join thousands making a difference

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **TanStack Query** for data fetching
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **JWT** authentication
- **bcrypt** for password hashing
- **Multer** for file uploads
- **CORS** enabled for cross-origin requests

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type safety
- **Concurrently** for running multiple processes
- **Hot reload** for development

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MySQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecofinds
   ```

2. **Install all dependencies**
   ```bash
   npm run setup
   ```

3. **Set up the database**
   ```bash
   cd backend
   npm run setup-db
   npm run seed-data
   ```

4. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=ecofinds_db
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:3000`
   - Frontend development server on `http://localhost:8080`

### Alternative Setup (Manual)

If you prefer to set up each part separately:

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
ecofinds/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Authentication & validation
│   ├── routes/             # API endpoints
│   ├── scripts/            # Database setup scripts
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── lib/            # Utility functions
│   └── public/             # Static assets
└── README.md
```

## 🔧 Available Scripts

### Root Level
- `npm run setup` - Install all dependencies
- `npm run dev` - Start both frontend and backend
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build frontend for production

### Backend Scripts
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run setup-db` - Initialize database
- `npm run seed-data` - Populate with sample data
- `npm run test-api` - Test API endpoints

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### User Management
- `GET /api/users/dashboard` - Get user dashboard
- `PUT /api/users/profile` - Update user profile

## 🎨 UI Components

The project uses a comprehensive set of reusable UI components built with Radix UI and styled with Tailwind CSS:

- **Forms**: Input, Button, Select, Checkbox, Radio Group
- **Navigation**: Navbar, Breadcrumb, Pagination
- **Feedback**: Toast, Alert, Progress, Skeleton
- **Layout**: Card, Sheet, Dialog, Accordion
- **Data Display**: Table, Badge, Avatar, Tooltip

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Zod schema validation
- **CORS Protection**: Configured for secure cross-origin requests
- **SQL Injection Prevention**: Parameterized queries

## 🌱 Environmental Impact

EcoFinds is designed to promote sustainable living:

- **Waste Reduction**: Extends product lifecycles
- **Carbon Footprint**: Tracks environmental impact
- **Community Building**: Connects eco-conscious users
- **Education**: Promotes sustainable consumption habits

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
Ensure you have the following environment variables set:
- Database connection details
- JWT secret key
- File upload configuration
- CORS settings

## 📊 Performance

- **Frontend**: Optimized with Vite for fast builds and hot reload
- **Backend**: Express.js with efficient middleware
- **Database**: MySQL with proper indexing
- **Images**: Optimized file uploads and storage

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Real-time chat system
- [ ] Advanced analytics dashboard
- [ ] AI-powered product recommendations
- [ ] Integration with shipping providers
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA) features

---

**Made with ❤️ for a sustainable future**

*Join us in building a more eco-conscious world, one transaction at a time.*