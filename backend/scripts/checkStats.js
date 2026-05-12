import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkData = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const roles = await Role.find({ role_name: { $in: ['customer', 'Customer'] } });
        console.log('Found Roles:', roles.map(r => ({ id: r._id, name: r.role_name })));

        const roleIds = roles.map(r => r._id);
        const userCount = await User.countDocuments({ role_id: { $in: roleIds } });
        console.log('Total Customers in DB:', userCount);

        const allUsers = await User.find({ role_id: { $in: roleIds } }).limit(5);
        console.log('Sample Customers:', allUsers.map(u => ({ name: u.full_name, role: u.role_id, tier: u.loyalty?.tier })));

        await mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

checkData();
