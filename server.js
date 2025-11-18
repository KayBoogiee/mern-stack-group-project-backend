require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');          // ← make sure cors is here

const app = express();

// Middleware
app.use(cors());           // ← VERY IMPORTANT for frontend to connect
app.use(express.json());

// ROOT ROUTE — THIS MUST BE THE ONLY ONE
app.route('/')
  .head((req, res) => res.sendStatus(200))
  .get((req, res) => {
    res.json({
      message: 'Backend is LIVE and working perfectly! 🚀',
      status: 'success',
      timestamp: new Date().toISOString(),
      info: 'Your API routes should be under /api/...',
    });
  });

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();