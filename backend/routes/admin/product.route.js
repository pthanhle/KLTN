import express from 'express'
import {
  getProductsByCategory,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/admin/product.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'
import { upload } from '../../config/cloudinary.js'

const router = express.Router()

router.use(protect, admin)

const uploadImageFields = (req, res, next) => {
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'photos', maxCount: 10 }
  ])(req, res, (err) => {
    if (err) {
      console.error('Multer Error:', err)
      return res.status(400).json({ message: err.message })
    }
    next()
  })
}

router.route('/')
  .get(getAllProducts)
  .post(uploadImageFields, createProduct)

router.route('/:id')
  .get(getProductById)
  .put(uploadImageFields, updateProduct)
  .delete(deleteProduct)

router.get('/:categoryId', getProductsByCategory)

export default router
