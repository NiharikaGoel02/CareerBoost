const mongoose = require('../db/mongoose');

const analysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  resumeText: String,
  jobDescription: String,
  analysisRaw: String,
  analysisJson: {
    strengths: [String],
    weaknesses: [String],
    skillsToImprove: [String],
    courseRecommendations: [String],
    overallEvaluation: String
  },
  analysisStructured: {
    strengths: [String],
    weaknesses: [String],
    skillsToImprove: [String],
    courseRecommendations: [String],
    overallEvaluation: String
  },
  createdAt: { type: Date, default: Date.now, index: true }
});

// Add compound index for user queries sorted by creation date
analysisSchema.index({ user: 1, createdAt: -1 });

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis; 