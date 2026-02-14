// Load environment variables FIRST (before any other imports)
import './config/env.js';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import './config/passport.js'; // Initialize passport config (env already loaded)

const app = express();

// CORS Configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies

// Initialize passport
app.use(passport.initialize());

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Organic Shop API Server',
    status: 'Running',
    version: '1.0.0'
  });
});

// API routes
app.get('/api/health', (req, res) => {
  const readyState = mongoose.connection.readyState;
  const connected = readyState === 1;

  res.json({
    status: 'OK',
    message: 'Server is healthy',
    db: {
      connected,
      readyState,
      name: connected ? mongoose.connection.name : null,
      host: connected ? mongoose.connection.host : null
    }
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Order routes
app.use('/api/orders', orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Something went wrong!',
    message: err.message 
  });
});

export default app;
