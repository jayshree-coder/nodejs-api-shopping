const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/login.model');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, 'secret-key', { expiresIn: '15m' });

    const refreshToken = jwt.sign({ id: user._id }, 'refresh-secret-key', { expiresIn: '1d' });

    user.refreshToken = refreshToken;
   

    res.json({ message: 'Login successful', accessToken, refreshToken, role: user.role });
  } catch (err) {
    console.error('Error finding user', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login
};