import express from 'express'
import {
    getFavorites,
    toggleFavorite,
    removeFavorite,
} from '../../controllers/client/favorite.controller.js'
import { protect } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .get(protect, getFavorites)
    .post(protect, toggleFavorite)

router.route('/:product_id')
    .delete(protect, removeFavorite)

export default router
