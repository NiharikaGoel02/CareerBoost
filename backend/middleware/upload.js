const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// --------------------
// Cloudinary Config
// --------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --------------------
// PDF Upload Storage
// --------------------
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'resumes',       // Cloudinary folder
    resource_type: 'raw',    // required for PDFs / DOCXs
    format: 'pdf',           // force PDF
  },
});

const upload = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    console.log('[upload.js] 📄 Processing file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
    });

    if (file.mimetype === 'application/pdf') {
      console.log('[upload.js][if] ✅ File is PDF');
      cb(null, true);
    } else {
      console.log('[upload.js][else] ❌ File is not PDF');
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// --------------------
// Image Upload Storage
// --------------------
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images',
    resource_type: 'image',
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    console.log('[upload.js] 🖼️ Processing image file:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
    });

    if (file.mimetype.startsWith('image/')) {
      console.log('[upload.js][if] ✅ File is image');
      cb(null, true);
    } else {
      console.log('[upload.js][else] ❌ File is not image');
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// --------------------
// Middleware to log secure URL
// --------------------
// Middleware to assign Cloudinary URL to req.fileUrl
function logSecureUrl(req, res, next) {
  if (req.file && req.file.secure_url) {
    req.fileUrl = req.file.secure_url;
    console.log('[upload.js] ✅ File uploaded to Cloudinary:', req.fileUrl);
    next();
  } else {
    console.log('[upload.js] ❌ Cloudinary URL not found in file');
    return res.status(400).json({ error: 'Cloudinary upload failed' });
  }
}

module.exports = { upload, imageUpload, logSecureUrl };

