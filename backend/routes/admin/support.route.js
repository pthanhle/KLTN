import express from 'express';
import {
  getAllSupportRequests,
  getSupportRequestById,
  replyAndResolveSupportRequest
} from '../../controllers/staff/sale/support.controller.js';
import { protect, adminOrStaff } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOrStaff);

router.get('/', getAllSupportRequests);

router.get('/:id', getSupportRequestById);

router.put('/:id/reply', replyAndResolveSupportRequest);

export default router;
