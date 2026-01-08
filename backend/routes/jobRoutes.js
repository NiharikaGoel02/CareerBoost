const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.get('/recommend', auth, jobController.getRecommendedJobs);

module.exports = router;