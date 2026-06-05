import express from 'express'
import {
    getRepairProgresses,
    getRepairProgressById,
    createRepairProgress,
    updateRepairProgress,
    deleteRepairProgress,
} from '../../../controllers/staff/service/repairProgress.controller.js'
import { processReception } from '../../../controllers/staff/service/workflow/reception.controller.js'
import { updateDiagnostics, createQuotation, approveQuotation } from '../../../controllers/staff/service/workflow/workshop.controller.js'
import { assignMechanic } from '../../../controllers/staff/service/workflow/assign.controller.js'
import { updateQC } from '../../../controllers/staff/service/workflow/qc.controller.js'
import { processHandover } from '../../../controllers/staff/service/workflow/handover.controller.js'
import { protect, serviceStaff } from '../../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, serviceStaff)

router.route('/')
    .get(getRepairProgresses)
    .post(createRepairProgress)

router.post('/reception', processReception)
router.post('/assign', assignMechanic)
router.post('/diagnostics', updateDiagnostics)
router.post('/quotation', createQuotation)
router.post('/quotation/approve', approveQuotation)
router.post('/qc', updateQC)
router.post('/handover', processHandover)

router.route('/:id')
    .get(getRepairProgressById)
    .put(updateRepairProgress)
    .delete(deleteRepairProgress)

export default router