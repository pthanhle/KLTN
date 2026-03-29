import express from 'express'
import {
  getMyFeedbacks,
  getPublicFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from '../../controllers/client/feedback.controller.js'
import { protect, customer } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.get('/public', getPublicFeedbacks)

router.use(protect, customer)

router.route('/')
  .get(getMyFeedbacks)
  .post(createFeedback)

router.route('/:id')
  .get(getFeedbackById)
  .put(updateFeedback)
  .delete(deleteFeedback)

export default router