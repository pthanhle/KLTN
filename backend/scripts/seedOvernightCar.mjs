import mongoose from 'mongoose';
import '../models/index.js';
import RepairProgress from '../models/repairprogressModel.js';
import Booking from '../models/bookingModel.js';

const MONGO_URI = process.env.MONGO_URI;
const BAY_2_ID = '6a230b5550dfd387849164d6';

async function run() {
    if (!MONGO_URI) {
        console.error('MONGO_URI not set.');
        process.exit(1);
    }
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Find any booking to reference
    const booking = await Booking.findOne().lean();
    if (!booking) {
        console.error('No booking found in DB.');
        await mongoose.disconnect();
        process.exit(1);
    }
    console.log('Using booking:', booking._id, '| plate:', booking.vehicle_info?.license_plate);

    // Yesterday at 08:00 and 19:00 (so the car "started yesterday" → triggers isContinuedFromYesterday on today's view)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const startDt = new Date(yesterday);
    startDt.setHours(8, 0, 0, 0);

    const endDt = new Date(yesterday);
    endDt.setHours(19, 0, 0, 0);

    // Remove any existing IN_PROGRESS record in bay 2 first
    await RepairProgress.deleteMany({ bay_id: BAY_2_ID, status: 'IN_PROGRESS' });

    const progress = await RepairProgress.create({
        booking_id: booking._id,
        bay_id: BAY_2_ID,
        status: 'IN_PROGRESS',
        expected_start_datetime: startDt,
        expected_end_datetime: endDt,
    });

    console.log('\nCreated overnight car in KHOANG 2:');
    console.log('  _id              :', progress._id);
    console.log('  bay_id           :', BAY_2_ID);
    console.log('  status           :', progress.status);
    console.log('  expected_start   :', startDt.toLocaleString('vi-VN'));
    console.log('  expected_end     :', endDt.toLocaleString('vi-VN'));
    console.log('\nXe sẽ hiển thị badge "🌙 Xe qua đêm" màu amber trong KHOANG 2.');

    await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
