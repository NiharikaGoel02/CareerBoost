const validateEnvironment = () => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'SESSION_SECRET',
    'GOOGLE_API_KEY',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ];

  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  // Validate specific formats
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET should be at least 32 characters long for security');
    process.exit(1);
  }

  if (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
    console.error('❌ SESSION_SECRET should be at least 32 characters long for security');
    process.exit(1);
  }

  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.startsWith('mongodb')) {
    console.error('❌ MONGODB_URI must be a valid MongoDB connection string');
    process.exit(1);
  }

  console.log('✅ All required environment variables are properly configured');
  return true;
};

module.exports = validateEnvironment;