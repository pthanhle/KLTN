import express from 'express';
import {
    getServiceItems,
    getServiceCategories,
    getServiceItemById,
    createServiceItem,
    updateServiceItem,
    deleteServiceItem,
    toggleServiceItemStatus
} from '../../controllers/admin/serviceItem.controller.js';
import { protect, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, admin);

router.route('/')
    .get(getServiceItems)
    .post(createServiceItem);

router.route('/categories').get(getServiceCategories);

router.route('/:id')
    .get(getServiceItemById)
    .put(updateServiceItem)
    .delete(deleteServiceItem);

router.patch('/:id/toggle-status', toggleServiceItemStatus);

export default router;
