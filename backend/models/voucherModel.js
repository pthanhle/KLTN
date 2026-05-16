import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    title: { type: String, required: true },
    description: { type: String },
    points_required: { type: Number, required: true },
    discount_type: { type: String, enum: ['PERCENT', 'FIXED', 'SERVICE'], required: true },
    discount_value: { type: Number, required: true },
    max_discount_amount: { type: Number },
    min_order_value: { type: Number, default: 0 },
    valid_days: { type: Number, required: true, default: 30 },
    is_active: { type: Boolean, default: true },
    image: { type: String }
  },
  { timestamps: true }
);

const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;
