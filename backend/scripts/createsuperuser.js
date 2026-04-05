import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const rl = readline.createInterface({ input, output });

const createSuperUser = async () => {
  try {
    await connectDB();

    console.log('\n--- Tạo Tài Khoản Superuser (Admin) ---'.cyan.bold);

    const email = await rl.question('Email: ');
    const username = await rl.question('Username: ');
    const password = await rl.question('Password: ');
    const full_name = await rl.question('Full Name: ');
    const phone = await rl.question('Phone: ');

    let adminRole = await Role.findOne({ role_name: 'admin' });
    if (!adminRole) {
      adminRole = await Role.create({ role_name: 'admin' });
      console.log('Role admin đã được tạo.'.yellow);
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      console.log('\nLỗi: Email hoặc Username đã tồn tại trong hệ thống.'.red.bold);
      process.exit(1);
    }

    const user = new User({
      email,
      username,
      password,
      full_name,
      phone,
      role_id: adminRole._id,
      status: 'active',
      isEmailVerified: true
    });

    await user.save();
    console.log('\nSuperuser đã được tạo thành công!'.green.bold);

    process.exit(0);
  } catch (error) {
    console.error(`\nLỗi: ${error.message}`.red);
    process.exit(1);
  } finally {
    rl.close();
  }
};

createSuperUser();
