const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/generate-quiz/:analysisId', quizController.generateQuizHandler);

module.exports = router; 