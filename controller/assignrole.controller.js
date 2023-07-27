const jwt = require('jsonwebtoken');
const User = require('../models/login.model');

const assignrole = async (req, res) => {
  try {
    const { username, role } = req.body;

   const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    const refreshToken = jwt.sign({ id: user._id, role }, 'refresh-secret-key', { expiresIn: '1d' });
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ message: 'Role assigned successfully', refreshToken });
  } catch (err) {
    console.error('Error assigning role to user', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  assignrole,
};