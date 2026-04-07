import express from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { 
  getPartCategories, 
  getPartBrands, 
  createPartBrand 
} from '../../controllers/admin/partMeta.controller.js';

const router = express.Router();

router.use(protect);

router.get('/categories', getPartCategories);
router.route('/brands')
  .get(getPartBrands)
  .post(createPartBrand);

export default router;
