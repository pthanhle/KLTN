import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection.db;

const progress = await db.collection('repairprogresses').findOne({ status: 'QUOTING' });

console.log('=== QUOTING Progress Full Details ===');
console.log('_id:', progress._id);
console.log('current_step:', progress.current_step);
console.log('status:', progress.status);
console.log('timeline count:', progress.timeline?.length);
console.log('');

progress.timeline?.forEach((step, i) => {
    console.log(`Timeline[${i}]: step=${step.step} status=${step.status}`);
    if (step.reception_info) {
        const ri = step.reception_info;
        console.log('  reception_info:');
        console.log('    odometer:', ri.odometer);
        console.log('    fuel_level:', ri.fuel_level);
        console.log('    customer_notes:', ri.customer_notes);
        console.log('    damage_map count:', ri.damage_map?.length ?? 0);
        console.log('    belongings count:', ri.belongings?.length ?? 0);
    } else {
        console.log('  reception_info: MISSING/EMPTY');
    }
    if (step.signatures) {
        const sig = step.signatures;
        console.log('  signatures:');
        console.log('    advisor:', sig.advisor?.name, 'url_length:', sig.advisor?.signature_url?.length ?? 0);
        console.log('    customer:', sig.customer?.name, 'url_length:', sig.customer?.signature_url?.length ?? 0);
    } else {
        console.log('  signatures: MISSING');
    }
});

process.exit(0);
