require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Root route — works perfectly for browser, Postman, and Heroku health checks
app.head('/', (req, res) => res.sendStatus(200));
app.get('/', (req, res) => {
  res.json({
    message: 'API is running successfully! 🚀',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Start server ONLY after DB is connected
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// Start everything
startServer();