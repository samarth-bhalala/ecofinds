import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('🌐 API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url, error.response?.data);
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized - redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: {
    username: string;
    email: string;
    password: string;
    display_name: string;
    phone?: string;
    address?: string;
  }) => api.post('/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  getProfile: () => api.get('/auth/profile'),

  updateProfile: (profileData: {
    display_name: string;
    phone?: string;
    address?: string;
  }) => api.put('/auth/profile', profileData),
};

// Products API
export const productsAPI = {
  getProducts: (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
  }) => api.get('/products', { params }),

  getProduct: (id: string) => api.get(`/products/${id}`),

  createProduct: (productData: {
    title: string;
    description: string;
    price: number;
    category_id: number;
    condition_type?: string;
    location?: string;
  }) => api.post('/products', productData),

  updateProduct: (id: string, productData: any) =>
    api.put(`/products/${id}`, productData),

  deleteProduct: (id: string) => api.delete(`/products/${id}`),

  getUserProducts: (userId: string) => api.get(`/products/user/${userId}`),
};

// Categories API
export const categoriesAPI = {
  getCategories: () => api.get('/categories'),

  getCategory: (id: string) => api.get(`/categories/${id}`),
};

// Favorites API
export const favoritesAPI = {
  getFavorites: () => api.get('/favorites'),

  addFavorite: (productId: string) => api.post(`/favorites/${productId}`),

  removeFavorite: (productId: string) => api.delete(`/favorites/${productId}`),
};

// Messages API
export const messagesAPI = {
  getConversations: () => api.get('/messages/conversations'),

  getMessages: (userId: string) => api.get(`/messages/${userId}`),

  sendMessage: (messageData: {
    receiver_id: number;
    product_id?: number;
    message: string;
  }) => api.post('/messages', messageData),

  getUnreadCount: () => api.get('/messages/unread/count'),
};

// Purchases API (placeholder - would need backend implementation)
export const purchasesAPI = {
  getPurchases: () => api.get('/purchases'),
  
  getPurchase: (id: string) => api.get(`/purchases/${id}`),
  
  createPurchase: (purchaseData: {
    product_id: number;
    seller_id: number;
    price: number;
  }) => api.post('/purchases', purchaseData),
};

export default api;
