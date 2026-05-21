import mongoose from 'mongoose';

const customerVoucherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    voucher: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', default: null },
    promotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion', default: null },
    code: { type: String, required: true },
    status: { type: String, enum: ['UNUSED', 'USED', 'EXPIRED'], default: 'UNUSED' },
    redeemed_at: { type: Date, default: Date.now },
    expires_at: { type: Date, required: true },
    used_at: { type: Date },
    used_on_order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
  },
  { timestamps: true }
);

const CustomerVoucher = mongoose.model('CustomerVoucher', customerVoucherSchema);
export default CustomerVoucher;
