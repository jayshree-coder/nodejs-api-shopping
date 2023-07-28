const jwt = require('jsonwebtoken');
const User = require('../models/login.model');

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (user) {
      // Update the user's role to "admin"
      user.role = 'admin';
      user.isAdmin = true;
      await user.save();
    }
    return user;
  } catch (error) {
    console.error('Error fetching user by ID', error);
    return null;
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const decodedToken = jwt.verify(refreshToken, 'refresh-secret-key');

    const user = await getUserById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, 'secret-key', { expiresIn: '15m' });

    res.json({ user: { id: user._id, username: user.username, role: user.role }, accessToken });
  } catch (err) {
    console.error('Error refreshing token', err);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

module.exports = {
  refresh,
};