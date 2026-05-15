import asyncHandler from 'express-async-handler';
import LoyaltyHistory from '../../models/loyaltyHistoryModel.js';
import CustomerVoucher from '../../models/customerVoucherModel.js';
import Voucher from '../../models/voucherModel.js';
import { loyaltyService } from '../../services/loyalty.service.js';


export const getLoyaltyHistory = asyncHandler(async (req, res) => {
    const history = await LoyaltyHistory.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(history);
});


export const getMyVouchers = asyncHandler(async (req, res) => {
    const vouchers = await CustomerVoucher.find({ user: req.user._id })
        .populate('voucher', 'title description discount_type discount_value min_order_value image')
        .sort({ createdAt: -1 });
    res.json(vouchers);
});

export const redeemVoucher = asyncHandler(async (req, res) => {
    const { voucherId } = req.body;
    
    if (!voucherId) {
        res.status(400);
        throw new Error('Vui lòng chọn Voucher muốn đổi');
    }

    try {
        const customerVoucher = await loyaltyService.redeemVoucher(req.user._id, voucherId);
        res.status(201).json({
            message: 'Đổi Voucher thành công',
            customerVoucher
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
