// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

// 1. Load Config
dotenv.config();

// 2. Connect to Database
connectDB();

// 3. Initialize App
const app = express();

// 4. Middleware
app.use(express.json()); // Allow JSON data
app.use(cors());         // Allow Frontend to hit Backend

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// 5. Test Route
app.get('/', (req, res) => {
  res.send('AeroNex Backend is Running...');
});

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\x1b[33m%s\x1b[0m`, `[Server] Running on port ${PORT}`); // Yellow color
});
