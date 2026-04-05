import mongoose from 'mongoose'

const notificationSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
      enum: ['BOOKING', 'ORDER', 'SYSTEM', 'PROMOTION', 'MAINTENANCE'],
      default: 'SYSTEM',
    },
    reference_id: {
      type: String,
    },
    reference_link: {
      type: String,
    },
    is_read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification