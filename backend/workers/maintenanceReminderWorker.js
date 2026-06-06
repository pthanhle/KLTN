import { Queue, Worker } from 'bullmq'
import redisConnection from '../config/redis.js'
import Booking from '../models/bookingModel.js'
import Notification from '../models/notificationModel.js'
import User from '../models/userModel.js'
import emailQueue from '../queues/emailQueue.js'
import { maintenanceReminderEmail } from '../utils/emailTemplates.js'
import { createAndEmitNotification } from '../utils/notificationHelper.js'

const QUEUE_NAME = 'maintenanceReminderQueue'
const FRONTEND_URL = process.env.CLIENT_URL || 'http://localhost:3000'
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000

const maintenanceReminderQueue = new Queue(QUEUE_NAME, { connection: redisConnection })

// Schedule a repeatable daily job at 8:00 AM
maintenanceReminderQueue.add(
  'dailyCheck',
  {},
  {
    repeat: { pattern: '0 8 * * *' },
    jobId: 'maintenance-reminder-daily',
    removeOnComplete: { count: 5 },
    removeOnFail: { count: 10 },
  }
)

const maintenanceReminderWorker = new Worker(
  QUEUE_NAME,
  async (job) => {
    console.log('[MaintenanceReminder] Bắt đầu kiểm tra nhắc nhở bảo dưỡng...')

    const ninetyDaysAgo = new Date(Date.now() - NINETY_DAYS_MS)

    // Find users whose most recent completed service booking is 3+ months old
    const usersToRemind = await Booking.aggregate([
      {
        $match: {
          booking_status: 'COMPLETED',
          booking_type: { $in: ['service', 'maintenance'] },
          user_id: { $exists: true, $ne: null },
        },
      },
      { $sort: { updatedAt: -1 } },
      {
        $group: {
          _id: '$user_id',
          lastCompletedAt: { $first: '$updatedAt' },
        },
      },
      {
        $match: {
          lastCompletedAt: { $lte: ninetyDaysAgo },
        },
      },
    ])

    console.log(`[MaintenanceReminder] Tìm thấy ${usersToRemind.length} khách hàng cần nhắc nhở`)

    let reminded = 0
    for (const entry of usersToRemind) {
      const userId = entry._id

      // Skip if a MAINTENANCE reminder was already sent within the last 90 days
      const recentReminder = await Notification.findOne({
        user_id: userId,
        type: 'MAINTENANCE',
        createdAt: { $gte: ninetyDaysAgo },
      })
      if (recentReminder) continue

      const user = await User.findById(userId).select('full_name email')
      if (!user || !user.email) continue

      await createAndEmitNotification(userId, {
        title: 'Nhắc nhở bảo dưỡng định kỳ',
        message: 'Đã hơn 3 tháng kể từ lần bảo dưỡng gần nhất. Hãy đặt lịch để giữ xe luôn trong tình trạng tốt nhất!',
        type: 'MAINTENANCE',
        reference_link: '/booking',
      })

      await emailQueue.add('sendEmail', {
        to: user.email,
        ...maintenanceReminderEmail(user.full_name, `${FRONTEND_URL}/booking`),
      })

      reminded++
    }

    console.log(`[MaintenanceReminder] Đã gửi nhắc nhở cho ${reminded} khách hàng`)
  },
  { connection: redisConnection }
)

maintenanceReminderWorker.on('completed', (job) => {
  console.log(`[MaintenanceReminder] Job ${job.id} hoàn thành`)
})

maintenanceReminderWorker.on('failed', (job, err) => {
  console.error(`[MaintenanceReminder] Job ${job?.id} thất bại:`, err.message)
})

export default maintenanceReminderWorker
