import asyncHandler from 'express-async-handler';
import SupportRequest from '../../models/supportRequestModel.js';


export const createSupportRequest = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === '') {
    res.status(400);
    throw new Error('Vui lòng nhập nội dung yêu cầu hỗ trợ');
  }

  const supportRequest = await SupportRequest.create({
    user: req.user._id,
    message,
    messages: [
      {
        sender: req.user._id,
        senderName: req.user.name || req.user.username,
        senderRole: 'customer',
        text: message,
        timestamp: new Date(),
      },
    ],
    status: 'pending',
  });

  const populatedRequest = await SupportRequest.findById(supportRequest._id)
    .populate('user', 'username email')
    .populate('messages.sender', 'username email');

  res.status(201).json({
    message: 'Yêu cầu hỗ trợ đã được tạo',
    supportRequest: populatedRequest,
  });
});


export const getActiveSupportRequest = asyncHandler(async (req, res) => {

  const activeRequest = await SupportRequest.findOne({
    user: req.user._id,
    status: { $in: ['pending', 'in_progress'] }
  })
    .populate('user', 'username email')
    .populate('messages.sender', 'username email');

  res.json({
    activeRequest: activeRequest || null,
  });
});


export const sendSupportMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    res.status(400);
    throw new Error('Vui lòng nhập nội dung tin nhắn');
  }

  const supportRequest = await SupportRequest.findById(req.params.id);

  if (!supportRequest) {
    res.status(404);
    throw new Error('Yêu cầu hỗ trợ không tồn tại');
  }

  if (supportRequest.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Không có quyền gửi tin nhắn cho yêu cầu này');
  }

  if (supportRequest.status === 'resolved') {
    res.status(400);
    throw new Error('Yêu cầu đã được đóng');
  }

  supportRequest.messages.push({
    sender: req.user._id,
    senderName: req.user.name || req.user.username,
    senderRole: 'customer',
    text: text.trim(),
    timestamp: new Date(),
  });

  await supportRequest.save();

  const updatedRequest = await SupportRequest.findById(supportRequest._id)
    .populate('user', 'username email')
    .populate('messages.sender', 'username email');

  res.json({
    message: 'Tin nhắn đã được gửi',
    supportRequest: updatedRequest,
  });
});


export const closeSupportRequest = asyncHandler(async (req, res) => {

  const supportRequest = await SupportRequest.findById(req.params.id);

  if (!supportRequest) {
    res.status(404);
    throw new Error('Yêu cầu hỗ trợ không tồn tại');
  }

  if (supportRequest.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Không có quyền đóng yêu cầu này');
  }

  supportRequest.status = 'resolved';
  await supportRequest.save();

  const updatedRequest = await SupportRequest.findById(supportRequest._id)
    .populate('user', 'username email')
    .populate('messages.sender', 'username email');

  res.json({
    message: 'Đã đóng yêu cầu hỗ trợ',
    supportRequest: updatedRequest,
  });
});
