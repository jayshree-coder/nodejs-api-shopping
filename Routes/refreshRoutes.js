// refreshRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/login.model');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const decodedToken = jwt.verify(refreshToken, 'refresh-secret-key');

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, 'secret-key', { expiresIn: '15m' });

    res.json({ user, accessToken });
  } catch (err) {
    console.error('Error refreshing token', err);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
});

module.exports = router;