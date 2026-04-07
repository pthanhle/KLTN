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
    variant: { type: String },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: { type: String },

    images: { type: [String], default: [] },

    likes: { type: Number, default: 0 },
    liked_by: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    replies: [{
      user_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }],

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
