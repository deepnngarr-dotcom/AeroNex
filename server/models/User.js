// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false // Don't return password in API responses by default
  },
  role: {
    type: String,
    enum: ['farmer', 'pilot', 'admin'],
    default: 'farmer'
  },
  
  // === PILOT SPECIFIC FIELDS ===
  // These will be empty for Farmers
  pilotProfile: {
    licenseNumber: String, // DGCA RPC Number
    isVerified: { type: Boolean, default: false },
    baseLocation: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere' } // [Longitude, Latitude]
    },
    experienceHours: { type: Number, default: 0 },
    credibilityScore: { type: Number, default: 500 }, // The Aero-Credit Score
    badges: [{ type: String }] // e.g. ["VERIFIED", "ACE_COMMANDER"]
  },
  farmSize: { type: Number },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 1. Encrypt Password using Bcrypt before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 2. Method to Match Password (for Login)
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);