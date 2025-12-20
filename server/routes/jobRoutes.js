// server/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const { 
  postJob, 
  getJobsNearby, 
  acceptJob, 
  getMyJobs, 
  getPilotJobs, 
  startJob, 
  completeJob,
  clearSafety
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// Farmer Routes
router.post('/', protect, postJob);
router.get('/my-jobs', protect, getMyJobs);

// Pilot Routes
router.get('/nearby', protect, getJobsNearby);
router.get('/pilot-history', protect, getPilotJobs);
router.put('/:id/accept', protect, acceptJob);
router.put('/:id/safety-clear', protect, clearSafety);
router.put('/:id/start', protect, startJob);
router.put('/:id/complete', protect, completeJob);

module.exports = router;