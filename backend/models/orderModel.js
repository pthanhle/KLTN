import mongoose from 'mongoose'

const customerInfoSchema = new mongoose.Schema(
  {
    full_name: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String },
  },
  { _id: false }
)

const trackingInfoSchema = new mongoose.Schema(
  {
    provider: { type: String },
    tracking_code: { type: String },
  },
  { _id: false }
)

const orderItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    sku: { type: String },
    name: { type: String },
    image: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    unit_price: { type: Number, required: true },
    total_price: { type: Number, required: true },
  },
  { _id: false }
)

const orderSchema = mongoose.Schema(
  {
    order_code: { type: String, unique: true, sparse: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    customer_info: { type: customerInfoSchema },

    order_type: {
      type: String,
      enum: ['CAR_PURCHASE', 'ACCESSORIES',],
      default: 'ACCESSORIES',
    },

    items: { type: [orderItemSchema], default: [] },

    shipping_fee: { type: Number, default: 0 },
    discount_amount: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },

    payment_method: {
      type: String,
      enum: ['CASH', 'BANK_TRANSFER', 'CARD', 'E_WALLET'],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ['UNPAID', 'PAID', 'REFUNDED', 'PARTIAL'],
      default: 'UNPAID',
    },
    order_status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED',],
      default: 'PENDING',
    },

    tracking_info: { type: trackingInfoSchema },

    invoice_url: { type: String, default: null },

    order_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order