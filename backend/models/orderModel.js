import mongoose from 'mongoose'

const itemsSchema = new mongoose.Schema(
  {
    part_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
    sku: { type: String },
    name: { type: String },
    image: { type: String },
    properties: { type: String },
    quantity: { type: Number, required: true },
    original_price: { type: Number },
    unit_price: { type: Number, required: true },
    total_price: { type: Number, required: true },
    selected_options: { type: mongoose.Schema.Types.Mixed },
    is_reviewed: { type: Boolean, default: false }
  },
  { _id: false }
)

const vatInfoSchema = new mongoose.Schema(
  {
    is_requested: { type: Boolean, default: false },
    company_name: { type: String },
    tax_code: { type: String },
    company_address: { type: String },
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
    order_type: {
      type: String,
      enum: ['CAR_PURCHASE', 'ACCESSORIES'],
      default: 'ACCESSORIES',
    },
    order_status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
    },
    cancel_reason: { type: String },

    financials: {
      subtotal: { type: Number },
      shipping_fee: { type: Number },
      discount: { type: Number },
      vat: { type: Number },
      grand_total: { type: Number, required: true },
    },

    payment: {
      method: { type: String, required: true },
      method_name: { type: String },
      card_tail: { type: String },
      transaction_id: { type: String },
      status: { type: String, enum: ['UNPAID', 'PAID', 'REFUNDED', 'PARTIAL'], default: 'UNPAID' },
    },

    shipping: {
      provider: { type: String },
      tracking_code: { type: String },
      estimated_delivery: { type: String },
    },

    delivery: {
      receiver_name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      masked_email: { type: String },
      address: { type: String, required: true },
      note: { type: String },
    },

    vat_info: { type: vatInfoSchema },

    items: { type: [itemsSchema], default: [] },

    assignment: {
      assigned_staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', default: null },
      assigned_at: { type: Date },
      assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },

    invoice_url: { type: String, default: null },

    order_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order