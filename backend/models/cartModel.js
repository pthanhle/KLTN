import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String },
    sku: { type: String },
    image: { type: String },
    unit_price: { type: Number },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
)

const cartSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: { type: [cartItemSchema], default: [] },
  },
  {
    timestamps: true,
  }
)

cartSchema.index({ user_id: 1 }, { unique: true })

const Cart = mongoose.model('Cart', cartSchema)

export default Cart