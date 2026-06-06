import express from 'express'
import {
    getStaff,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
    getStaffDepartments,
    updateStaffProfile,
    getStaffCompliance,
    updateStaffCompliance,
    resetStaffPassword,
} from '../../controllers/admin/staff.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
    .get(getStaff)
    .post(createStaff)

// Named sub-routes must come before /:id
router.get('/departments', getStaffDepartments)
router.post('/:id/reset-password', resetStaffPassword)
router.put('/:id/profile', updateStaffProfile)
router.get('/:id/compliance', getStaffCompliance)
router.put('/:id/compliance', updateStaffCompliance)

router.route('/:id')
    .get(getStaffById)
    .put(updateStaff)
    .delete(deleteStaff)

export default router
