import express from 'express'
import {
    getRepairProgresses,
    getRepairProgressById,
    createRepairProgress,
    updateRepairProgress,
    deleteRepairProgress,
} from '../../../controllers/staff/service/repairProgress.controller.js'
import { protect, serviceStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, serviceStaff)

router.route('/')
    .get(getRepairProgresses)
    .post(createRepairProgress)

router.route('/:id')
    .get(getRepairProgressById)
    .put(updateRepairProgress)
    .delete(deleteRepairProgress)

export default router