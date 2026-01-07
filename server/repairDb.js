// server/repairDb.js
const mongoose = require('mongoose');

// We hardcode the address here to avoid path errors
const MONGO_URI = "mongodb://127.0.0.1:27017/aeronex"; 

const fixDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    // 1. DELETE the broken 'jobs' collection
    try {
      await mongoose.connection.db.dropCollection('jobs');
      console.log(' Dropped old/broken "jobs" collection.');
    } catch (err) {
      console.log(' "jobs" collection did not exist (that is okay).');
    }

    // 2. FORCE CREATE the 2dsphere Index
    const collection = mongoose.connection.db.collection('jobs');
    await collection.createIndex({ location: "2dsphere" });
    
    console.log('  SUCCESS: "2dsphere" Index created manually!');
    console.log(' The map should work now.');

    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixDatabase();