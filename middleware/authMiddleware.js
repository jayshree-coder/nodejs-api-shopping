const jwt = require('jsonwebtoken');
const User = require('../models/login.model');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  try {
    const decodedToken = jwt.verify(token, 'secret-key');
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;