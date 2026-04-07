import express from 'express';
import { getActiveParts, getPartBySlug, createPartReview, deletePartReview, likePartReview, replyPartReview, deletePartReviewReply, editPartReview, editPartReviewReply } from '../../controllers/client/part.controller.js';
import { getPartCategories, getPartBrands } from '../../controllers/admin/partMeta.controller.js';
import { protect, customer } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getActiveParts);
router.get('/categories', getPartCategories);
router.get('/brands', getPartBrands);
router.get('/:slug', getPartBySlug);

// Reviews
router.post('/:id/reviews', protect, customer, createPartReview);
router.put('/reviews/:reviewId', protect, customer, editPartReview);
router.delete('/reviews/:reviewId', protect, customer, deletePartReview);
router.post('/reviews/:reviewId/like', protect, customer, likePartReview);
router.post('/reviews/:reviewId/reply', protect, customer, replyPartReview);
router.put('/reviews/:reviewId/reply/:replyId', protect, customer, editPartReviewReply);
router.delete('/reviews/:reviewId/reply/:replyId', protect, customer, deletePartReviewReply);

export default router;
