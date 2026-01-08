const cloudinary = require('cloudinary').v2;

// Cloudinary automatically reads CLOUDINARY_URL from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // not needed if using CLOUDINARY_URL
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
