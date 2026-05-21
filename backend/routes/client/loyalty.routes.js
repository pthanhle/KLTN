import express from 'express';
import { getLoyaltyHistory, getMyVouchers, validateVoucherCode, redeemVoucher } from '../../controllers/client/loyalty.controller.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/history', protect, getLoyaltyHistory);
router.get('/my-vouchers', protect, getMyVouchers);
router.post('/validate-voucher', protect, validateVoucherCode);
router.post('/redeem', protect, redeemVoucher);

export default router;
