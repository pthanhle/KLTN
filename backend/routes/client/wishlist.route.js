import express from 'express';
import { getWishlist, toggleWishlistStatus, clearWishlist } from '../../controllers/client/wishlist.controller.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getWishlist)
  .delete(protect, clearWishlist);

router.route('/toggle')
  .post(protect, toggleWishlistStatus);

export default router;
