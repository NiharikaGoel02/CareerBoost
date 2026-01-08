const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('[auth.js][if] No token provided');
    return res.status(401).json({ error: 'Access token required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    console.log('[auth.js][if] Token verified for user:', decoded.userId);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.log('[auth.js][error] Token expired');
      return res.status(401).json({ error: 'Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      console.log('[auth.js][error] Invalid token');
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.log('[auth.js][error] Token verification failed:', err.message);
    return res.status(500).json({ error: 'Token verification failed' });
  }
}

module.exports = auth; 