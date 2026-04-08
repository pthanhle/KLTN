import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    part: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Part',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    selected_options: {
      type: Map,
      of: String,
      default: {}
    }
  },
  { _id: true, timestamps: true } // Mongoose will automatically generate an _id for each item in the array, helpful for uniquely identifying items with different options
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Cart', cartSchema);