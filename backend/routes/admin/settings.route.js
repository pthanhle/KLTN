import express from 'express'
import { updateContactInfo } from '../../controllers/admin/settings.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.put('/contact', protect, admin, updateContactInfo)

export default router
