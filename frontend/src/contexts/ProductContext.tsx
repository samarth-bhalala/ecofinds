import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { productsAPI, categoriesAPI } from '../services/api';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  category_name: string;
  seller_id: number;
  seller_name: string;
  seller_image?: string;
  condition_type: string;
  images?: string[];
  location?: string;
  is_available: boolean;
  is_featured: boolean;
  views_count: number;
  created_at: string;
  isFavorited?: boolean;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

interface ProductContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: any) => Promise<void>;
  fetchProduct: (id: string) => Promise<Product | null>;
  fetchCategories: () => Promise<void>;
  createProduct: (productData: any) => Promise<void>;
  updateProduct: (id: string, productData: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  filterProducts: (filters: any) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getProducts(params);
      setProducts(response.data.products);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchProduct = async (id: string): Promise<Product | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getProduct(id);
      return response.data;
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to fetch product');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoriesAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: any) => {
    try {
      setLoading(true);
      setError(null);
      await productsAPI.createProduct(productData);
      // Refresh products list
      await fetchProducts();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to create product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, productData: any) => {
    try {
      setLoading(true);
      setError(null);
      await productsAPI.updateProduct(id, productData);
      // Refresh products list
      await fetchProducts();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to update product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await productsAPI.deleteProduct(id);
      // Remove from local state
      setProducts(products.filter(product => product.id !== parseInt(id)));
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to delete product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string) => {
    await fetchProducts({ search: query });
  };

  const filterProducts = async (filters: any) => {
    await fetchProducts(filters);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const value: ProductContextType = {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProduct,
    fetchCategories,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
