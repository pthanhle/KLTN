import mongoose from 'mongoose';
import '../models/index.js';
import Booking from '../models/bookingModel.js';
import Counter from '../models/counterModel.js';

const MONGO_URI = process.env.MONGO_URI;

const TYPE_GROUPS = {
    booking_seq_test_drive: ['test_drive'],
    booking_seq_service: ['service', 'maintenance'],
};

async function backfillGroup(counterName, bookingTypes) {
    const bookings = await Booking.find({
        booking_type: { $in: bookingTypes },
        sequence_number: { $exists: false },
    }).sort({ createdAt: 1 });

    let seq = (await Counter.findOne({ _id: counterName }))?.seq || 0;

    for (const booking of bookings) {
        seq += 1;
        booking.sequence_number = seq;
        await booking.save();
        console.log(`  ${booking.booking_code} => #${seq}`);
    }

    await Counter.findOneAndUpdate(
        { _id: counterName },
        { $set: { seq } },
        { upsert: true }
    );

    console.log(`Counter "${counterName}" set to ${seq} (${bookings.length} booking(s) backfilled)\n`);
}

async function run() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB\n');

    for (const [counterName, bookingTypes] of Object.entries(TYPE_GROUPS)) {
        console.log(`Backfilling sequence_number for types [${bookingTypes.join(', ')}] using counter "${counterName}"...`);
        await backfillGroup(counterName, bookingTypes);
    }

    await mongoose.disconnect();
    console.log('Done.');
}

run().catch(e => { console.error(e); process.exit(1); });
