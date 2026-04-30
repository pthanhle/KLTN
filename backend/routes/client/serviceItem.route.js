import express from 'express';
import {
    getPublicServiceItems,
    getPublicServiceItemById,
    getPublicServiceCategories
} from '../../controllers/client/serviceItem.controller.js';

const router = express.Router();

router.route('/').get(getPublicServiceItems);
router.route('/categories').get(getPublicServiceCategories);
router.route('/:id').get(getPublicServiceItemById);

export default router;
