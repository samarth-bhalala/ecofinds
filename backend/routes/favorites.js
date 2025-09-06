import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's favorites
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [favorites] = await pool.execute(`
      SELECT p.*, c.name as category_name, u.username as seller_name
      FROM favorites f
      JOIN products p ON f.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE f.user_id = ? AND p.is_available = true
      ORDER BY f.created_at DESC
    `, [req.user.id]);

    res.json({ favorites });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add product to favorites
router.post('/:productId', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if product exists
    const [products] = await pool.execute(
      'SELECT id FROM products WHERE id = ? AND is_available = true',
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if already favorited
    const [existingFavorites] = await pool.execute(
      'SELECT id FROM favorites WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    );

    if (existingFavorites.length > 0) {
      return res.status(400).json({ error: 'Product already in favorites' });
    }

    await pool.execute(
      'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
      [req.user.id, productId]
    );

    res.json({ message: 'Product added to favorites' });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove product from favorites
router.delete('/:productId', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.productId;

    const [result] = await pool.execute(
      'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.json({ message: 'Product removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
