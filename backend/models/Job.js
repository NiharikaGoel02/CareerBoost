const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  workType: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior Level'],
    required: true
  },
  compensationType: {
    type: String,
    enum: ['Paid', 'Unpaid', 'Performance-based'],
    required: true
  },
  salary: {
    type: String,
    default: 'Not specified'
  },
  requiredSkills: [{
    type: String
  }],
  matchingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  recommendations: {
    type: String,
    required: true
  },
  nextSteps: [{
    type: String
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);
