import mongoose from 'mongoose';

const loyaltyHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    points_change: { type: Number, required: true },
    transaction_type: { 
      type: String, 
      enum: ['EARN', 'REDEEM', 'GIFT', 'ADJUSTMENT', 'PENALTY'], 
      required: true 
    },
    description: { type: String, required: true },
    reference_id: { type: mongoose.Schema.Types.ObjectId },
    reference_model: { type: String, enum: ['Order', 'RepairProgress', 'Voucher', 'Admin'] }
  },
  { timestamps: true }
);

const LoyaltyHistory = mongoose.model('LoyaltyHistory', loyaltyHistorySchema);
export default LoyaltyHistory;
