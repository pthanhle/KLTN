import mongoose from 'mongoose';
import '../models/index.js';
import RepairProgress from '../models/repairprogressModel.js';

const MONGO_URI = process.env.MONGO_URI;

async function run() {
    if (!MONGO_URI) {
        console.error('MONGO_URI not set. Run with: node --env-file=.env scripts/resetWorkshopProgress.mjs');
        process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const ACTIVE_STATUSES = ['DIAGNOSING', 'QUOTING', 'WAITING_PARTS', 'IN_PROGRESS', 'QC_TESTING'];

    const result = await RepairProgress.updateMany(
        { status: { $in: ACTIVE_STATUSES }, bay_id: { $ne: null } },
        { $set: { bay_id: null, mechanic_id: null, status: 'RECEIVED' } }
    );

    console.log(`\nReset ${result.modifiedCount} repair progress record(s):`);
    console.log('  - bay_id      → null');
    console.log('  - mechanic_id → null');
    console.log('  - status      → RECEIVED (chờ phân công lại)\n');
    console.log('Xong. Tất cả xe đã được đưa về hàng chờ phân công.');

    await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exit(1); });
