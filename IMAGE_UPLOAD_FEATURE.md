# User Image Upload Feature

## Overview
This feature allows users to upload and manage their profile images in the ResumeUp.AI application.

## Features

### Backend Changes
1. **User Model Update**: Added `image` field to store image file paths
2. **Image Upload Middleware**: Created `imageUpload` middleware for handling image files
3. **Upload Route**: Added `/api/user/upload-image` endpoint for image uploads
4. **Static File Serving**: Configured Express to serve uploaded images from `/uploads` directory
5. **Image Management**: Automatic cleanup of old images when new ones are uploaded

### Frontend Changes
1. **ImageUpload Component**: New reusable component for image upload functionality
2. **UserContext Update**: Added `updateUserImage` function to manage user image state
3. **Dashboard Integration**: Updated Header component to use the new ImageUpload component
4. **Real-time Updates**: Image changes are immediately reflected in the UI

## Technical Details

### File Size Limits
- Maximum image size: 5MB
- Supported formats: All image types (JPEG, PNG, GIF, etc.)

### Security Features
- File type validation (images only)
- File size validation
- Authentication required for uploads
- Automatic cleanup of old images

### User Experience
- Click on avatar to upload new image
- Visual feedback during upload (loading spinner)
- Success/error messages
- Hover effects and smooth transitions
- Fallback to user initials when no image is set

## API Endpoints

### POST /api/user/upload-image
Upload a user profile image.

**Headers:**
- `Authorization: Bearer <token>`

**Body:**
- `image`: Image file (multipart/form-data)

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully.",
  "image": "uploads/1234567890-image.jpg"
}
```

## Usage

1. Navigate to the dashboard
2. Click on the user avatar (bottom-right camera icon)
3. Select an image file
4. The image will be uploaded and displayed immediately

## File Structure

```
backend/
├── uploads/           # Uploaded images directory
├── middleware/
│   └── upload.js     # Image upload middleware
├── controllers/
│   └── userController.js  # Image upload handler
└── routes/
    └── userRoutes.js      # Upload route

frontend/
└── src/
    └── components/
        └── dashboard/
            └── ImageUpload.jsx  # Image upload component
```