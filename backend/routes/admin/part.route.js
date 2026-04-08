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

router.use(protect, admin);

router.route('/')
  .get(getAllParts)
  .post(createPart);

router.post('/bulk-delete', bulkDeleteParts);

router.route('/:id')
  .get(getPartById)
  .put(updatePart)
  .delete(deletePart);

router.patch('/:id/status', updatePartStatus);

router.post('/reviews/:reviewId/reply', replyPartReview);

export default router;
