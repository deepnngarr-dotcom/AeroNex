// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`\x1b[36m%s\x1b[0m`, `[MongoDB] Connected: ${conn.connection.host}`); // Cyan color
  } catch (error) {
    console.error(`\x1b[31m%s\x1b[0m`, `[MongoDB] Error: ${error.message}`); // Red color
    process.exit(1); // Stop the server if DB fails
  }
};

module.exports = connectDB;