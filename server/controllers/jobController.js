// server/controllers/jobController.js
const Job = require('../models/Job');

// 1. Post a Job (Farmer)
const postJob = async (req, res) => {
  try {
    // Add scheduledDate to destructuring
    const { cropType, areaAcres, budget, latitude, longitude, address, hasVehicleAccess, scheduledDate } = req.body;
    
    const job = await Job.create({
      farmer: req.user.id,
      cropType,
      areaAcres,
      budget,
      scheduledDate, // <--- Save it here
      location: { type: 'Point', coordinates: [longitude, latitude], address },
      logistics: { hasVehicleAccess }
    });
    res.status(201).json(job);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); 
  }
};

// 2. Get Jobs Nearby (Pilot Map)
const getJobsNearby = async (req, res) => {
  try {
    const { lat, lng, dist } = req.query;
    const searchRadius = dist ? parseInt(dist) : 20000; 
    const jobs = await Job.find({
      status: 'OPEN',
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: searchRadius 
        }
      }
    }).populate('farmer', 'name');
    res.json(jobs);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// 3. Accept Job (Pilot)
const acceptJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || job.status !== 'OPEN') return res.status(400).json({ message: 'Job unavailable' });
    
    job.assignedPilot = req.user.id; // Assign the pilot
    job.status = 'ASSIGNED';
    await job.save();
    res.json(job);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// 4. Get My Jobs (Farmer History)
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ farmer: req.user.id }).sort({ createdAt: -1 }).populate('assignedPilot', 'name email');
    res.json(jobs);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// 5. Get Pilot Jobs (Pilot History)
const getPilotJobs = async (req, res) => {
  try {
    // Debug log to confirm ID is correct
    console.log("Fetching missions for Pilot:", req.user.id);
    const jobs = await Job.find({ assignedPilot: req.user.id }).sort({ createdAt: -1 }).populate('farmer', 'name phone');
    res.json(jobs);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); 
  }
};

// 6. Clear Safety Checks
const clearSafety = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.assignedPilot.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    
    job.isSafetyCleared = true;
    await job.save();
    res.json(job);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// 7. Start Mission
const startJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.assignedPilot.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    job.status = 'IN_PROGRESS';
    await job.save();
    res.json(job);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// 8. Complete Mission
const completeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.assignedPilot.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    job.status = 'COMPLETED';
    await job.save();
    res.json(job);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

// === EXPORT EVERYTHING ===
module.exports = { 
  postJob, 
  getJobsNearby, 
  acceptJob, 
  getMyJobs, 
  getPilotJobs, 
  clearSafety, 
  startJob, 
  completeJob 
};