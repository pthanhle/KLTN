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

const uploadImageWrapper = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer Error:', err)
      return res.status(400).json({ message: err.message })
    }
    next()
  })
}

router.route('/')
  .get(getAllProducts)
  .post(uploadImageWrapper, createProduct)

router.route('/:id')
  .get(getProductById)
  .put(uploadImageWrapper, updateProduct)
  .delete(deleteProduct)

router.get('/:categoryId', getProductsByCategory)

export default router
