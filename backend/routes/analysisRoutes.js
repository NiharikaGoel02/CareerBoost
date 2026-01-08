const express = require('express');
const router = express.Router();
const { upload, logSecureUrl } = require('../middleware/upload'); // include logSecureUrl
const auth = require('../middleware/auth');
const analysisController = require('../controllers/analysisController');

// ✅ Analyze Resume
router.post(
  '/analyze-resume',
  auth,
  upload.single('resume'),
  logSecureUrl, // ensures req.fileUrl exists
  analysisController.analyzeResumeHandler
);


// ✅ Get analysis by ID
router.get('/analysis/:analysisId', auth, analysisController.getAnalysisById);

// ✅ Get all analyses
router.get("/analyses", auth, analysisController.getAllAnalyses); // NO LIMITER

module.exports = router;
