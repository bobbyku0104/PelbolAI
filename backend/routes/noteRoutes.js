const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

let mockNotes = [];
let noteIdCounter = 1;

// Get all notes for logged in user
router.get('/', protect, (req, res) => {
  try {
    const userNotes = mockNotes.filter(n => n.user === req.user._id).sort((a,b) => b.updatedAt - a.updatedAt);
    res.json(userNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new note
router.post('/', protect, (req, res) => {
  try {
    const { title, content, category } = req.body;
    const newNote = {
      _id: `note_${noteIdCounter++}`,
      user: req.user._id,
      title,
      content,
      category: category || 'General',
      updatedAt: new Date(),
      createdAt: new Date()
    };
    mockNotes.push(newNote);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a note
router.put('/:id', protect, (req, res) => {
  try {
    const noteIndex = mockNotes.findIndex(n => n._id === req.params.id);
    
    if (noteIndex === -1) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (mockNotes[noteIndex].user !== req.user._id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { title, content, category, isFavorite } = req.body;
    mockNotes[noteIndex] = {
      ...mockNotes[noteIndex],
      title: title || mockNotes[noteIndex].title,
      content: content !== undefined ? content : mockNotes[noteIndex].content,
      category: category || mockNotes[noteIndex].category,
      isFavorite: isFavorite !== undefined ? isFavorite : mockNotes[noteIndex].isFavorite,
      updatedAt: new Date()
    };

    res.json(mockNotes[noteIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a note
router.delete('/:id', protect, (req, res) => {
  try {
    const noteIndex = mockNotes.findIndex(n => n._id === req.params.id);

    if (noteIndex === -1) return res.status(404).json({ message: 'Note not found' });

    if (mockNotes[noteIndex].user !== req.user._id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    mockNotes.splice(noteIndex, 1);
    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
