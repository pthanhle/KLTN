import express from 'express'
import {
    getStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
} from '../../controllers/admin/staff.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
    .get(getStaff)
    .post(createStaff)

router.route('/:id')
    .get(getStaffById)
    .put(updateStaff)
    .delete(deleteStaff)

export default router