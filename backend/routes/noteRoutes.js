const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/authMiddleware');

// Get all notes for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new note
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = new Note({
      user: req.user._id,
      title,
      content,
      category
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a note
router.put('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { title, content, category, isFavorite } = req.body;
    note.title = title || note.title;
    note.content = content || note.content;
    note.category = category || note.category;
    note.isFavorite = isFavorite !== undefined ? isFavorite : note.isFavorite;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a note
router.delete('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await note.deleteOne();
    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
