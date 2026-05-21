import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/userModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const resetAdminPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const adminUser = await User.findOne({ email: 'admin@gmail.com' });
        if (adminUser) {
            adminUser.password = '123456';
            await adminUser.save();
            console.log('Admin password successfully reset to 123456');
        } else {
            console.log('Admin user admin@gmail.com not found');
        }

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Error resetting admin password:', err.message);
        process.exit(1);
    }
};

resetAdminPassword();
