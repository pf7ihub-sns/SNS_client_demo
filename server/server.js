require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173', // Local Vite dev server
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || !process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);

// Serve static React files in production
app.use(express.static(path.join(__dirname, '../dist')));

// Fallback to React router for all other GET requests not starting with /api
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// MongoDB Connection
const PORT = 5001;
const MONGODB_URI = "mongodb://client-demo:Client_Demo%40123@dev.snssquare.com:27017/client-demo?authSource=client-demo&tls=true";

if (!MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in .env file.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
