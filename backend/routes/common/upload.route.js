import express from 'express';
import { upload } from '../../config/cloudinary.js';
import { uploadImages, uploadSingleImage } from '../../controllers/common/upload.controller.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all upload routes
router.use(protect);

// Endpoint for uploading multiple images (e.g. part gallery, landing block gallery)
// The field name 'images' must match the key sent from frontend form-data
router.post('/images', upload.array('images', 10), uploadImages);

// Endpoint for uploading single image (e.g. landing block hero cover)
// The field name 'image' must match the key sent from frontend form-data
router.post('/image', upload.single('image'), uploadSingleImage);

export default router;
