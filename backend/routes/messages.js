import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateMessage } from '../middleware/validation.js';

const router = express.Router();

// Get user's conversations
router.get('/conversations', authenticateToken, async (req, res) => {
  try {
    const [conversations] = await pool.execute(`
      SELECT DISTINCT
        CASE 
          WHEN sender_id = ? THEN receiver_id 
          ELSE sender_id 
        END as other_user_id,
        u.username as other_username,
        u.profile_image as other_user_image,
        m.message as last_message,
        m.created_at as last_message_time,
        m.is_read,
        p.title as product_title,
        p.id as product_id
      FROM messages m
      JOIN users u ON (
        CASE 
          WHEN m.sender_id = ? THEN m.receiver_id 
          ELSE m.sender_id 
        END = u.id
      )
      LEFT JOIN products p ON m.product_id = p.id
      WHERE m.sender_id = ? OR m.receiver_id = ?
      ORDER BY m.created_at DESC
    `, [req.user.id, req.user.id, req.user.id, req.user.id]);

    res.json({ conversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages between two users
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    const [messages] = await pool.execute(`
      SELECT m.*, u.username as sender_name, u.profile_image as sender_image
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?)
      ORDER BY m.created_at ASC
    `, [req.user.id, otherUserId, otherUserId, req.user.id]);

    // Mark messages as read
    await pool.execute(
      'UPDATE messages SET is_read = true WHERE sender_id = ? AND receiver_id = ? AND is_read = false',
      [otherUserId, req.user.id]
    );

    res.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send message
router.post('/', authenticateToken, validateMessage, async (req, res) => {
  try {
    const { receiver_id, product_id, message } = req.body;

    // Check if receiver exists
    const [users] = await pool.execute(
      'SELECT id FROM users WHERE id = ?',
      [receiver_id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Receiver not found' });
    }

    // Check if product exists (if provided)
    if (product_id) {
      const [products] = await pool.execute(
        'SELECT id FROM products WHERE id = ?',
        [product_id]
      );

      if (products.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
    }

    const [result] = await pool.execute(
      'INSERT INTO messages (sender_id, receiver_id, product_id, message) VALUES (?, ?, ?, ?)',
      [req.user.id, receiver_id, product_id, message]
    );

    res.status(201).json({
      message: 'Message sent successfully',
      messageId: result.insertId
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get unread message count
router.get('/unread/count', authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = false',
      [req.user.id]
    );

    res.json({ unreadCount: result[0].count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
