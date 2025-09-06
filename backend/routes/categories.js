import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT * FROM categories ORDER BY name ASC'
    );

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single category with products count
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [categoryId]
    );

    if (categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const [countResult] = await pool.execute(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ? AND is_available = true',
      [categoryId]
    );

    res.json({
      category: categories[0],
      productsCount: countResult[0].count
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
