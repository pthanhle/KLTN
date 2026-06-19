import express from 'express'
import { getContactInfo, submitContactForm } from '../../controllers/client/contact.controller.js'

const router = express.Router()

router.get('/', getContactInfo)
router.post('/submit', submitContactForm)

export default router
