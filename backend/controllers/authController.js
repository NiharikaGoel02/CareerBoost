const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Signup
async function signup(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log('[Signup] Request:', req.body);
    if (!name || !email || !password || !confirmPassword) {
      console.log('[authController.js][if] ❌ Missing fields');
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
      console.log('[authController.js][if] ❌ Passwords do not match');
      return res.status(400).json({ error: 'Passwords do not match.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('[authController.js][if] ❌ Email already registered');
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    // Create token for immediate login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    console.log('[Signup] ✅ User registered successfully:', user.email);
    res.status(201).json({ 
      message: 'User registered successfully.',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        image: user.image,
        createdAt: user.createdAt 
      }
    });
  } catch (error) {
    console.error('[Signup] Error:', error);
    // Return a more specific error if available
    if (error.code === 11000) {
      console.log('[authController.js][if] ❌ Duplicate email error');
      return res.status(400).json({ error: 'Email already registered.' });
    }
    res.status(500).json({ error: error.message || 'Server error.' });
  }
}

// Signin
async function signin(req, res) {
  try {
    const { email, password } = req.body;
    console.log('[Signin] Request:', req.body);
    if (!email || !password) {
      console.log('[authController.js][if] ❌ Missing email or password');
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      console.log('[authController.js][if] ❌ User not found');
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('[authController.js][if] ❌ Invalid password');
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('[Signin] ✅ User signed in successfully:', email);
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        image: user.image,
        createdAt: user.createdAt 
      } 
    });
  } catch (error) {
    console.error('[Signin] Error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = { signup, signin }; 