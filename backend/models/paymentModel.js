import mongoose from 'mongoose'

const paymentSchema = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    progress_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RepairProgress',
    },
    payment_type: {
      type: String,
      enum: ['order', 'quotation_deposit', 'final_payment'],
      default: 'order',
    },
    amount: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
    method: {
      type: String,
      enum: ['cash', 'card', 'bank_transfer', 'e_wallet', 'vnpay'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
