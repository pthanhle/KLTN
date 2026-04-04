import mongoose from 'mongoose'

const feedbackSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: { type: String },

    images: { type: [String], default: [] },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback
