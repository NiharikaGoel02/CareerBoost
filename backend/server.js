// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const jwt = require('jsonwebtoken');

// Validate environment variables
const validateEnvironment = require('./config/validateEnv');
validateEnvironment();

// DB connection
require('./db/mongoose');

// Routes
const analysisRoutes = require('./routes/analysisRoutes');
const quizRoutes = require('./routes/quizRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const jobRoutes = require('./routes/jobRoutes');

// Middleware
const errorHandler = require('./middleware/errorHandler');
const { generalLimiter, analysisLimiter, authLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting
app.use(generalLimiter);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session middleware (required for passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      console.log('[server.js][if] Google user not found, creating new user');
      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: '', // No password for Google users
      });
    }
    return done(null, user);
  } catch (err) {
    console.log('[server.js][else] Error in GoogleStrategy callback');
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.log('[server.js][else] Error in deserializeUser');
    done(err, null);
  }
});

// Google OAuth routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/signin', session: false }), (req, res) => {
  // Issue JWT and redirect to frontend with token
  const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  // Redirect to frontend with token as query param
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/user/google-callback?token=${token}`);
});

// API Routes
app.use('/api', analysisLimiter, analysisRoutes);
app.use('/api', quizRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/jobs', jobRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running successfully!', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(errorHandler);

// Start server with error handling
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
};

startServer(PORT);

module.exports = app;