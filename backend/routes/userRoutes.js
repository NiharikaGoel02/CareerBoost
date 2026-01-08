const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { imageUpload } = require('../middleware/upload');
const userController = require('../controllers/userController');

router.get('/dashboard', auth, userController.dashboard);
router.post('/upload-image', auth, imageUpload.single('image'), userController.uploadImage);

module.exports = router;