import express from 'express'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../../controllers/admin/category.controller.js'
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
  .get(getCategories)
  .post(uploadImageWrapper, createCategory)

router.route('/:id')
  .put(uploadImageWrapper, updateCategory)
  .delete(deleteCategory)

export default router