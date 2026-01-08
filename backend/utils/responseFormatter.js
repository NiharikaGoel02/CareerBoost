/**
 * Standardized error response formatter
 */

const formatError = (message, code = 'GENERAL_ERROR', statusCode = 500, details = null) => ({
  success: false,
  error: {
    message,
    code,
    timestamp: new Date().toISOString(),
    ...(details && { details })
  }
});

const formatSuccess = (data, message = 'Success') => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString()
});

// Common error codes
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  DUPLICATE_RESOURCE: 'DUPLICATE_RESOURCE',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
  AI_PROCESSING_ERROR: 'AI_PROCESSING_ERROR'
};

module.exports = { 
  formatError, 
  formatSuccess, 
  ERROR_CODES 
};