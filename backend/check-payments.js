import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Payment from './models/paymentModel.js';
import Order from './models/orderModel.js';

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const recentPayments = await Payment.find().sort({ createdAt: -1 }).limit(5).lean();
        console.log('Recent Payments:');
        console.dir(recentPayments, { depth: null });

        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(2).lean();
        console.log('\nRecent Orders:');
        console.dir(recentOrders, { depth: null });

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
};

run();
