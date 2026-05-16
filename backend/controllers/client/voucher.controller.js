import asyncHandler from 'express-async-handler';
import Voucher from '../../models/voucherModel.js';

export const getAvailableVouchers = asyncHandler(async (req, res) => {
    const vouchers = await Voucher.find({ is_active: true })
        .sort({ points_required: 1 });
    res.json(vouchers);
});
