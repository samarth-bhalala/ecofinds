import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

// Get all products with pagination and filters
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const condition = req.query.condition;

    let query = `
      SELECT p.*, c.name as category_name, u.username as seller_name, u.profile_image as seller_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE p.is_available = true
    `;
    let params = [];

    if (category) {
      query += ' AND p.category_id = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (p.title LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (minPrice) {
      query += ' AND p.price >= ?';
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND p.price <= ?';
      params.push(maxPrice);
    }

    if (condition) {
      query += ' AND p.condition_type = ?';
      params.push(condition);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [products] = await pool.execute(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM products p WHERE p.is_available = true';
    let countParams = [];

    if (category) {
      countQuery += ' AND p.category_id = ?';
      countParams.push(category);
    }

    if (search) {
      countQuery += ' AND (p.title LIKE ? OR p.description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    if (minPrice) {
      countQuery += ' AND p.price >= ?';
      countParams.push(minPrice);
    }

    if (maxPrice) {
      countQuery += ' AND p.price <= ?';
      countParams.push(maxPrice);
    }

    if (condition) {
      countQuery += ' AND p.condition_type = ?';
      countParams.push(condition);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single product by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const productId = req.params.id;

    const [products] = await pool.execute(`
      SELECT p.*, c.name as category_name, u.username as seller_name, u.profile_image as seller_image, u.phone as seller_phone
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE p.id = ? AND p.is_available = true
    `, [productId]);

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];

    // Increment view count
    await pool.execute(
      'UPDATE products SET views_count = views_count + 1 WHERE id = ?',
      [productId]
    );

    // Check if user has favorited this product
    let isFavorited = false;
    if (req.user) {
      const [favorites] = await pool.execute(
        'SELECT id FROM favorites WHERE user_id = ? AND product_id = ?',
        [req.user.id, productId]
      );
      isFavorited = favorites.length > 0;
    }

    res.json({
      ...product,
      isFavorited
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new product
router.post('/', authenticateToken, validateProduct, async (req, res) => {
  try {
    const { title, description, price, category_id, condition_type, location } = req.body;
    const seller_id = req.user.id;

    const [result] = await pool.execute(
      'INSERT INTO products (title, description, price, category_id, seller_id, condition_type, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, price, category_id, seller_id, condition_type, location]
    );

    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertId
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update product
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, description, price, category_id, condition_type, location, is_available } = req.body;

    // Check if user owns this product
    const [products] = await pool.execute(
      'SELECT seller_id FROM products WHERE id = ?',
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (products[0].seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this product' });
    }

    await pool.execute(
      'UPDATE products SET title = ?, description = ?, price = ?, category_id = ?, condition_type = ?, location = ?, is_available = ? WHERE id = ?',
      [title, description, price, category_id, condition_type, location, is_available, productId]
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if user owns this product
    const [products] = await pool.execute(
      'SELECT seller_id FROM products WHERE id = ?',
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (products[0].seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this product' });
    }

    await pool.execute('DELETE FROM products WHERE id = ?', [productId]);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's products
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const [products] = await pool.execute(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.seller_id = ? AND p.is_available = true
      ORDER BY p.created_at DESC
    `, [userId]);

    res.json({ products });
  } catch (error) {
    console.error('Get user products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
