import express from 'express'
import { staffLogin, staffLogout } from '../../controllers/staff/auth.controller.js'

const router = express.Router()

router.post('/login', staffLogin)
router.post('/logout', staffLogout)

export default router
