import Notification from '../models/notificationModel.js'
import { getIO } from '../config/socket.js'

export const createAndEmitNotification = async (userId, { title, message, type = 'SYSTEM', reference_id, reference_link }) => {
  const notification = await Notification.create({
    user_id: userId,
    title,
    message,
    type,
    reference_id,
    reference_link,
    is_read: false,
  })

  try {
    const io = getIO()
    io.to(`user_${userId}`).emit('new_notification', notification)
  } catch (_) {
    // Socket may not be initialized yet (e.g., test environment)
  }

  return notification
}
