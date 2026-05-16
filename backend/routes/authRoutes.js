const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Simple "Open" Login/Register Route
router.post('/login', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    
    // Find user or create if not exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ 
        name: name || email.split('@')[0], 
        email, 
        password: password || 'nopassword' 
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Alias register to login for simplicity
router.post('/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'User already exists, just sign in!' });

    user = await User.create({ 
      name, 
      email, 
      password 
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
