import express from 'express';
import { getProfile, updateProfile } from '../../controllers/client/profile.controller.js';
import { protect } from '../../middleware/authMiddleware.js';
import { upload } from '../../config/cloudinary.js';

const router = express.Router();

router.route('/')
  .get(protect, getProfile)
  .put(protect, upload.single('avatar'), updateProfile);

export default router;
