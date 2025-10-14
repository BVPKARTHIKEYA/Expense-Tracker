const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
