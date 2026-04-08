import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import bcrypt from 'bcryptjs';

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-password')
    .populate('role_id', 'role_name');
    
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Người dùng không tồn tại');
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('Người dùng không tồn tại');
  }

  const {
    full_name, email, phone, address,
    currentPassword, newPassword,
    addresses, garage,
    customer_type, tax_info, preferences
  } = req.body;

  if (full_name) user.full_name = full_name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (address) user.address = address;

  if (addresses) user.addresses = addresses;
  if (garage) user.garage = garage;
  if (customer_type) user.customer_type = customer_type;
  if (tax_info) user.tax_info = tax_info;
  if (preferences) user.preferences = preferences;

  if (newPassword) {
    if (!currentPassword) {
      res.status(400);
      throw new Error('Cần nhập mật khẩu hiện tại để đổi mật khẩu');
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      res.status(401);
      throw new Error('Mật khẩu hiện tại không đúng');
    }

    user.password = newPassword;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    full_name: updatedUser.full_name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    address: updatedUser.address,
    addresses: updatedUser.addresses,
    garage: updatedUser.garage,
    customer_type: updatedUser.customer_type,
    tax_info: updatedUser.tax_info,
    loyalty: updatedUser.loyalty,
    preferences: updatedUser.preferences,
    role_id: updatedUser.role_id,
    status: updatedUser.status,
    avatar: updatedUser.avatar,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  });
});
