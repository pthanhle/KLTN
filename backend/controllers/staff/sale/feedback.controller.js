import Feedback from '../../../models/feedbackModel.js';
import asyncHandler from 'express-async-handler';


export const getAllFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find()
    .populate('user_id', 'username')
    .populate('product_id', 'product_name')
    .populate('service_id', 'service_name')
    .sort({ createdAt: -1 });
  res.json(feedbacks);
});

export const getFeedbackById = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id)
    .populate('user_id', 'username')
    .populate('product_id', 'product_name')
    .populate('service_id', 'service_name');

  if (!feedback) {
    res.status(404);
    throw new Error('Feedback not found');
  }
  res.json(feedback);
});


export const approveFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error('Feedback not found');
  }

  feedback.status = 'approved';
  const updatedFeedback = await feedback.save();
  res.json(updatedFeedback);
});


export const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error('Feedback not found');
  }

  await feedback.deleteOne();
  res.json({ message: 'Feedback removed' });
});
