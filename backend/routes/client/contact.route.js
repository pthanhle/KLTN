import express from 'express'
import { getContactInfo } from '../../controllers/client/contact.controller.js'

const router = express.Router()

router.get('/', getContactInfo)

export default router
