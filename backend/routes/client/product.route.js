import express from 'express'
import {
  getProducts,
  getProductById,
  getAllProducts,
  getProductsByCategory,
  getProductFilters,
  getFeaturedProducts,
} from '../../controllers/client/product.controller.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/filters', getProductFilters)
router.get('/featured', getFeaturedProducts)
router.get('/all', getAllProducts)
router.get('/by-category/:categoryId', getProductsByCategory)
router.get('/:id', getProductById)

export default router