import User from '../models/userModel.js';
import LoyaltyHistory from '../models/loyaltyHistoryModel.js';
import Voucher from '../models/voucherModel.js';
import CustomerVoucher from '../models/customerVoucherModel.js';

const TIER_MULTIPLIERS = {
  'BRONZE': 1.0,
  'SILVER': 1.2,
  'GOLD': 1.5,
  'PLATINUM': 2.0,
  'DIAMOND': 2.5,
  'TITANIUM': 3.0
};

const TIER_THRESHOLDS = [
  { tier: 'TITANIUM', minPoints: 500000 },
  { tier: 'DIAMOND', minPoints: 150000 },
  { tier: 'PLATINUM', minPoints: 50000 },
  { tier: 'GOLD', minPoints: 15000 },
  { tier: 'SILVER', minPoints: 5000 },
  { tier: 'BRONZE', minPoints: 0 }
];

const VND_PER_POINT = 10000;

const checkAndUpgradeTier = (accumulatedPoints) => {
  for (const threshold of TIER_THRESHOLDS) {
    if (accumulatedPoints >= threshold.minPoints) {
      return threshold.tier;
    }
  }
  return 'BRONZE';
};

const getMinPoints = (tier) => {
  const found = TIER_THRESHOLDS.find(t => t.tier === tier);
  return found ? found.minPoints : 0;
};

export const loyaltyService = {
  checkAndUpgradeTier,
  getMinPoints,

  calculatePoints: (amount, tier = 'BRONZE') => {
    const basePoints = Math.floor(amount / VND_PER_POINT);
    const multiplier = TIER_MULTIPLIERS[tier] || 1.0;
    return Math.floor(basePoints * multiplier);
  },

  processOrderCompletion: async (userId, orderId, totalAmount, model = 'Order') => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      const pointsEarned = loyaltyService.calculatePoints(totalAmount, user.loyalty?.tier);

      if (pointsEarned > 0) {
        await LoyaltyHistory.create({
          user: userId,
          points_change: pointsEarned,
          transaction_type: 'EARN',
          description: `Tích điểm từ đơn hàng/dịch vụ #${orderId.toString().slice(-6)}`,
          reference_id: orderId,
          reference_model: model
        });

        user.loyalty.points += pointsEarned;
        user.loyalty.accumulated_points += pointsEarned;
        user.loyalty.total_spent += totalAmount;
        
        const newTier = loyaltyService.checkAndUpgradeTier(user.loyalty.accumulated_points);
        if (newTier !== user.loyalty.tier) {
          user.loyalty.tier = newTier;
        }

        await user.save();
        
        return pointsEarned;
      }
      return 0;
    } catch (error) {
      console.error('Error processing loyalty points:', error);
      throw error;
    }
  },

  redeemVoucher: async (userId, voucherId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      const voucher = await Voucher.findById(voucherId);
      if (!voucher || !voucher.is_active) throw new Error('Voucher không hợp lệ hoặc đã hết hạn');

      if (user.loyalty.points < voucher.points_required) {
        throw new Error('Không đủ điểm để đổi voucher này');
      }

      user.loyalty.points -= voucher.points_required;
      user.loyalty.active_vouchers += 1;
      await user.save();
      await LoyaltyHistory.create({
        user: userId,
        points_change: -voucher.points_required,
        transaction_type: 'REDEEM',
        description: `Đổi điểm lấy voucher: ${voucher.title}`,
        reference_id: voucher._id,
        reference_model: 'Voucher'
      });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + voucher.valid_days);

      const customerVoucher = await CustomerVoucher.create({
        user: userId,
        voucher: voucher._id,
        code: `${voucher.code}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        expires_at: expiresAt
      });

      return customerVoucher;
    } catch (error) {
      throw error;
    }
  }
};
