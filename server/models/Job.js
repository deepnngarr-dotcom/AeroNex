// server/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
 
  assignedPilot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },


  cropType: { type: String, required: true },
  areaAcres: { type: Number, required: true },
  budget: { type: Number, required: true },
  
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
    address: { type: String }
  },
  
  logistics: {
    hasVehicleAccess: { type: Boolean, default: false }
  },

  status: {
    type: String,
    enum: ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'OPEN'
  },

  isSafetyCleared: {
    type: Boolean,
    default: false
  },

  createdAt: { type: Date, default: Date.now }
});

// Create Index for Geo-Spatial Search
jobSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Job', jobSchema);