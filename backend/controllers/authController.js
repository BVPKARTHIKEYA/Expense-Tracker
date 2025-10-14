const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      fullName,
      email: email.trim().toLowerCase(),
      password: password.trim(),
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error Registering user', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }
  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      id: user._id,
      user: userData,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user info', error: error.message });
  }
};
