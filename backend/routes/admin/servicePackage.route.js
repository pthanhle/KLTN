import express from 'express'
import {
    getServicePackages,
    getServicePackageById,
    createServicePackage,
    updateServicePackage,
    deleteServicePackage,
} from '../../controllers/admin/servicePackage.controller.js'
import { protect, admin } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect, admin)

router.route('/')
    .get(getServicePackages)
    .post(createServicePackage)

router.route('/:id')
    .get(getServicePackageById)
    .put(updateServicePackage)
    .delete(deleteServicePackage)

export default router