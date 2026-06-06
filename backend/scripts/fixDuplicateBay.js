import mongoose from 'mongoose';
import '../models/index.js';
import RepairProgress from '../models/repairprogressModel.js';

const MONGO_URI = process.env.MONGO_URI;
const DRY_RUN = process.argv[2] !== '--delete';

async function run() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    if (DRY_RUN) console.log('=== DRY RUN (pass --delete to actually delete) ===\n');

    const progresses = await RepairProgress.find({
        bay_id: { $ne: null },
        status: { $in: ['RECEIVED', 'DIAGNOSING'] }
    }).sort({ createdAt: 1 });

    const byBay = {};
    for (const p of progresses) {
        if (!byBay[p.bay_id]) byBay[p.bay_id] = [];
        byBay[p.bay_id].push(p);
    }

    let found = false;
    for (const [bayId, entries] of Object.entries(byBay)) {
        if (entries.length > 1) {
            found = true;
            console.log(`Bay "${bayId}" has ${entries.length} entries (DUPLICATE):`);
            entries.forEach((e, i) => {
                const tag = i < entries.length - 1 ? ' <-- sẽ xóa (cũ hơn)' : ' <-- GIỮ LẠI (mới nhất)';
                console.log(`  [${i}] _id: ${e._id} | booking_id: ${e.booking_id} | status: ${e.status} | createdAt: ${e.createdAt}${tag}`);
            });

            if (!DRY_RUN) {
                const toDelete = entries.slice(0, entries.length - 1);
                for (const doc of toDelete) {
                    await RepairProgress.deleteOne({ _id: doc._id });
                    console.log(`  => DELETED: ${doc._id}`);
                }
            }
            console.log('');
        }
    }

    if (!found) console.log('No duplicate bay assignments found.');

    await mongoose.disconnect();
    console.log('Done.');
}

run().catch(e => { console.error(e); process.exit(1); });
