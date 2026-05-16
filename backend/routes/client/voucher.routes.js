import express from 'express';
import { getAvailableVouchers } from '../../controllers/client/voucher.controller.js';

const router = express.Router();

router.get('/available', getAvailableVouchers);

export default router;
