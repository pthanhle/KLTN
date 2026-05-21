import mongoose from 'mongoose'

const promotionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    discount_type: {
      type: String,
      enum: ['PERCENT', 'FIXED', 'FREE'],
      required: true,
    },
    discount_value: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    max_discount: {
      type: Number,
      default: null,
    },
    is_loyalty: {
      type: Boolean,
      default: false,
    },
    points_required: {
      type: Number,
      default: 0,
    },
    validity_days: {
      type: Number,
      default: 0,
    },
    code: {
      type: String,
      default: null,
      sparse: true,
    },
    min_order_value: {
      type: Number,
      default: 0,
    },
    start_date: {
      type: Date,
      default: null,
    },
    end_date: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
    },
    claimed_count: {
      type: Number,
      default: 0,
    },
    used_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Promotion = mongoose.model('Promotion', promotionSchema)

export default Promotion
