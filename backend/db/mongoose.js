const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume_analyzer';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌Error connecting to MongoDB:', err);
  });

module.exports = mongoose; 