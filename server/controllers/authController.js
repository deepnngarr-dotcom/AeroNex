// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'farmer'
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("👉 Login Attempt for:", email); // Debug Log 1

    // Explicitly ask for the password using .select('+password')
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log("❌ User not found in DB"); // Debug Log 2
      return res.status(400).json({ message: 'Invalid credentials (User not found)' });
    }

    console.log("✅ User found:", user.name);
    console.log("🔑 Password field exists?", user.password ? "YES" : "NO (Undefined!)"); // Debug Log 3

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("🔓 Password Match! Logging in...");
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id)
      });
    } else {
      console.log("⛔ Password mismatch"); // Debug Log 4
      res.status(400).json({ message: 'Invalid credentials (Password mismatch)' });
    }
  } catch (error) {
    console.error("🔥 Login Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update User Profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.bio = req.body.bio || user.bio;
      
      // Pilot Specific
      if (req.body.licenseNumber) {
        user.licenseNumber = req.body.licenseNumber;
        user.isVerified = false; 
      }

      // Farmer Specific
      if (req.body.farmSize) {
        user.farmSize = Number(req.body.farmSize);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        farmSize: updatedUser.farmSize,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        token: req.headers.authorization.split(' ')[1]
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// === EXPORT ALL FUNCTIONS ===
module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile
};