import express from 'express';
import { upload } from '../../config/cloudinary.js';
import { uploadImages, uploadSingleImage } from '../../controllers/common/upload.controller.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/images', upload.array('images', 10), uploadImages);

router.post('/image', upload.single('image'), uploadSingleImage);

export default router;
