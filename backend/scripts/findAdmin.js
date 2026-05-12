import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const findAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const adminRole = await Role.findOne({ role_name: { $in: ['admin', 'Admin'] } });
        if (!adminRole) {
            console.log('No Admin role found');
            await mongoose.connection.close();
            return;
        }

        const adminUser = await User.findOne({ role_id: adminRole._id });
        if (adminUser) {
            console.log('Found Admin:', adminUser.email);
        } else {
            console.log('No Admin user found');
        }

        await mongoose.connection.close();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

findAdmin();
