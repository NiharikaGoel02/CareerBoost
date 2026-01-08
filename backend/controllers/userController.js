const Analysis = require('../models/Analysis');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

async function dashboard(req, res) {
  try {
    const userId = req.user.id;
    console.log('[userController.js][try] Dashboard request for user:', userId);
    const analyses = await Analysis.find({ user: userId }).sort({ createdAt: -1 });
    const user = await User.findById(userId).select('-password');
    console.log('[userController.js][if] ✅ Analyses found:', analyses.length);
    res.json({ analyses, user });
  } catch (error) {
    console.error('[Dashboard] Error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
}

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Delete old image if it exists
    if (user.image) {
      const oldImagePath = path.join(__dirname, '..', '..', user.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update user with new image path
    const imagePath = `uploads/${req.file.filename}`;
    user.image = imagePath;
    await user.save();

    console.log('[uploadImage] ✅ Image uploaded successfully for user:', userId);
    res.json({ 
      success: true, 
      message: 'Image uploaded successfully.',
      image: imagePath 
    });
  } catch (error) {
    console.error('[uploadImage] Error:', error);
    res.status(500).json({ error: 'Server error.' });
  }
}

module.exports = { dashboard, uploadImage };