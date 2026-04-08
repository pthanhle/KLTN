import express from 'express';
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand } from '../../controllers/admin/brand.controller.js';
import { protect, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(admin);

router.route('/')
  .get(getBrands)
  .post(createBrand);

router.route('/:id')
  .get(getBrandById)
  .put(updateBrand)
  .delete(deleteBrand);

export default router;
