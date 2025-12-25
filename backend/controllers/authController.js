import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const userName = username || name;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields', success: false });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username: userName }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      username: userName,
      email,
      password: hashedPassword
    });

    // Create token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials', success: false });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials', success: false });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.username || user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
