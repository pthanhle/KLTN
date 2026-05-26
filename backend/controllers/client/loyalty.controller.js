import asyncHandler from 'express-async-handler';
import LoyaltyHistory from '../../models/loyaltyHistoryModel.js';
import CustomerVoucher from '../../models/customerVoucherModel.js';
import Promotion from '../../models/promotionModel.js';
import User from '../../models/userModel.js';


export const getLoyaltyHistory = asyncHandler(async (req, res) => {
    const history = await LoyaltyHistory.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(history);
});


export const getMyVouchers = asyncHandler(async (req, res) => {
    const vouchers = await CustomerVoucher.find({ user: req.user._id })
        .populate('promotion', 'title description discount_type discount_value min_order_value max_discount')
        .populate('voucher', 'title description discount_type discount_value min_order_value')
        .sort({ createdAt: -1 });
    res.json(vouchers);
});


export const validateVoucherCode = asyncHandler(async (req, res) => {
    const { code } = req.body;

    if (!code) {
        res.status(400);
        throw new Error('Vui lòng nhập mã voucher');
    }

    const upperCode = code.trim().toUpperCase();

    const customerVoucher = await CustomerVoucher.findOne({
        user: req.user._id,
        code: upperCode,
        status: 'UNUSED',
    })
        .populate('promotion', 'title description discount_type discount_value max_discount min_order_value')
        .populate('voucher', 'title description discount_type discount_value max_discount_amount min_order_value');

    if (customerVoucher) {
        if (new Date() > new Date(customerVoucher.expires_at)) {
            customerVoucher.status = 'EXPIRED';
            await customerVoucher.save();
            res.status(400);
            throw new Error('Mã voucher đã hết hạn');
        }

        const info = customerVoucher.promotion || customerVoucher.voucher;
        return res.json({
            message: 'Mã voucher hợp lệ',
            voucher: {
                _id: customerVoucher._id,
                code: customerVoucher.code,
                title: info?.title || 'Voucher',
                description: info?.description || '',
                discount_type: info?.discount_type || 'FIXED',
                discount_value: info?.discount_value || 0,
                max_discount: info?.max_discount || info?.max_discount_amount || null,
                min_order_value: info?.min_order_value || 0,
                expires_at: customerVoucher.expires_at,
            },
        });
    }

    const publicPromo = await Promotion.findOne({
        code: upperCode,
        status: 'ACTIVE'
    });

    if (publicPromo) {
        if (publicPromo.end_date && new Date() > new Date(publicPromo.end_date)) {
            res.status(400);
            throw new Error('Mã giảm giá đã hết hạn');
        }
        if (publicPromo.start_date && new Date() < new Date(publicPromo.start_date)) {
            res.status(400);
            throw new Error('Mã giảm giá chưa đến thời gian áp dụng');
        }

        return res.json({
            message: 'Mã giảm giá hợp lệ',
            voucher: {
                _id: publicPromo._id,
                code: publicPromo.code,
                title: publicPromo.title,
                description: publicPromo.description,
                discount_type: publicPromo.discount_type,
                discount_value: publicPromo.discount_value,
                max_discount: publicPromo.max_discount,
                min_order_value: publicPromo.min_order_value,
                expires_at: publicPromo.end_date,
            },
        });
    }

    res.status(404);
    throw new Error('Mã giảm giá không hợp lệ hoặc đã được sử dụng');
});


export const redeemVoucher = asyncHandler(async (req, res) => {
    const { promotionId } = req.body;

    if (!promotionId) {
        res.status(400);
        throw new Error('Vui lòng chọn ưu đãi muốn đổi');
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error('Không tìm thấy người dùng');
    }

    const promotion = await Promotion.findById(promotionId);
    if (!promotion || promotion.status !== 'ACTIVE' || !promotion.is_loyalty) {
        res.status(400);
        throw new Error('Ưu đãi không hợp lệ hoặc đã hết hạn');
    }

    if (user.loyalty.points < promotion.points_required) {
        res.status(400);
        throw new Error('Không đủ điểm để đổi ưu đãi này');
    }

    user.loyalty.points -= promotion.points_required;
    await user.save();

    await LoyaltyHistory.create({
        user: req.user._id,
        points_change: -promotion.points_required,
        transaction_type: 'REDEEM',
        description: `Đổi điểm lấy ưu đãi: ${promotion.title}`,
        reference_id: promotion._id,
        reference_model: 'Admin',
    });

    const validDays = promotion.validity_days > 0 ? promotion.validity_days : 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + validDays);

    let voucherCode;
    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
        const timePart = Date.now().toString(36).slice(-4).toUpperCase();
        voucherCode = `PROMO-${randomPart}${timePart}`;
        const existing = await CustomerVoucher.findOne({ code: voucherCode });
        if (!existing) break;

        attempts++;
    }

    if (attempts >= maxAttempts) {
        res.status(500);
        throw new Error('Không thể tạo mã voucher unique, vui lòng thử lại');
    }

    const customerVoucher = await CustomerVoucher.create({
        user: req.user._id,
        promotion: promotion._id,
        code: voucherCode,
        expires_at: expiresAt,
    });

    res.status(201).json({
        message: 'Đổi ưu đãi thành công',
        customerVoucher,
        remaining_points: user.loyalty.points,
    });
});
