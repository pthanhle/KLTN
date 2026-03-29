import express from 'express';
import {
  createSupportRequest,
  getActiveSupportRequest,
  closeSupportRequest,
  sendSupportMessage
} from '../../controllers/client/support.controller.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createSupportRequest);

router.get('/active', protect, getActiveSupportRequest);

router.post('/:id/message', protect, sendSupportMessage);

router.put('/:id/close', protect, closeSupportRequest);

export default router;
