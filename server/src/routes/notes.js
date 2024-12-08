const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM notes ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM notes WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 