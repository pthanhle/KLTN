import asyncHandler from 'express-async-handler';
import Notification from '../../models/notificationModel.js';


export const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const notifications = await Notification.find({ user_id: userId })
    .sort({ createdAt: -1 });

  if (!notifications) {
    return res.status(200).json([]);
  }

  res.status(200).json(notifications);
});


export const getNotificationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const notification = await Notification.findOne({
    _id: id,
    user_id: userId,
  });

  if (!notification) {
    res.status(404);
    throw new Error('Không tìm thấy thông báo');
  }

  res.status(200).json(notification);
});


export const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const notification = await Notification.findOne({
    _id: id,
    user_id: userId,
  });

  if (!notification) {
    res.status(404);
    throw new Error('Không tìm thấy thông báo');
  }

  notification.is_read = true;
  await notification.save();

  res.status(200).json({
    message: 'Đã đánh dấu thông báo là đã đọc',
    notification,
  });
});


export const markAllAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await Notification.updateMany(
    { user_id: userId, is_read: false },
    { $set: { is_read: true } }
  );

  res.status(200).json({
    message: 'Đã đánh dấu tất cả thông báo là đã đọc',
  });
});
