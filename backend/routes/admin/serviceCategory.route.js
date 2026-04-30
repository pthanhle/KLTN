import express from 'express';
import { protect, admin } from '../../middleware/authMiddleware.js';
import {
    getServiceCategories,
    createServiceCategory,
    updateServiceCategory,
    deleteServiceCategory,
    toggleServiceCategoryStatus
} from '../../controllers/admin/serviceCategory.controller.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getServiceCategories)
    .post(protect, admin, createServiceCategory);

router.route('/:id')
    .put(protect, admin, updateServiceCategory)
    .delete(protect, admin, deleteServiceCategory);

router.route('/:id/toggle-status')
    .patch(protect, admin, toggleServiceCategoryStatus);

export default router;
