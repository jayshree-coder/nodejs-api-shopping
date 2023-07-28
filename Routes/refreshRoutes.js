const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/login.model');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const decodedToken = jwt.verify(refreshToken, 'refresh-secret-key');

    const user = await User.findById(decodedToken.id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, 'secret-key', { expiresIn: '15m' });

    res.json({ user: { id: user._id, username: user.username, role: user.role }, accessToken }); // Only include necessary user data
  } catch (err) {
    console.error('Error refreshing token', err);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
});

module.exports = router;