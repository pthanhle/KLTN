import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
await mongoose.connect(MONGO_URI);
console.log('Connected to:', mongoose.connection.name);

const Progress = mongoose.connection.db.collection('repairprogresses');

const result = await Progress.updateMany(
    { status: { $exists: false } },
    [{ $set: { status: '$current_step' } }]
);

console.log(`Updated ${result.modifiedCount} repairprogress documents (set status = current_step)`);

const progresses = await Progress.find({}).sort({ createdAt: -1 }).limit(5).toArray();
console.log('\n=== Updated RepairProgresses ===');
progresses.forEach(p => {
    console.log(`booking_id: ${p.booking_id} | current_step: ${p.current_step} | status: ${p.status}`);
});

process.exit(0);
