const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Simple "Open" Login/Register Route (No Database Check)
router.post('/login', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Fake user object to bypass MongoDB completely
    const fakeUser = {
      _id: 'mock_user_123',
      name: name || email.split('@')[0],
      email: email
    };

    const token = jwt.sign({ id: fakeUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
    
    res.json({
      _id: fakeUser._id,
      name: fakeUser.name,
      email: fakeUser.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Alias register to login for simplicity (No Database Check)
router.post('/register', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Fake user object to bypass MongoDB completely
    const fakeUser = {
      _id: 'mock_user_123',
      name: name || email.split('@')[0],
      email: email
    };

    const token = jwt.sign({ id: fakeUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
    
    res.status(201).json({
      _id: fakeUser._id,
      name: fakeUser.name,
      email: fakeUser.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
