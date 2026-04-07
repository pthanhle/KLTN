import express from 'express';
import { protect, admin } from '../../middleware/authMiddleware.js';
import {
  getAllParts,
  getPartById,
  createPart,
  updatePart,
  deletePart,
  updatePartStatus,
  bulkDeleteParts,
  replyPartReview
} from '../../controllers/admin/part.controller.js';

const router = express.Router();

// All Part Admin routes must be protected and restricted to appropriate roles
router.use(protect, admin);

// /api/v1/admin/parts
router.route('/')
  .get(getAllParts)
  .post(createPart);

router.post('/bulk-delete', bulkDeleteParts);

// /api/v1/admin/parts/:id
router.route('/:id')
  .get(getPartById)
  .put(updatePart)
  .delete(deletePart);

router.patch('/:id/status', updatePartStatus);

router.post('/reviews/:reviewId/reply', replyPartReview);

export default router;
