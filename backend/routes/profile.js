const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get profile
router.get('/', auth, async (req, res) => {
  try {
    res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/', auth, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;