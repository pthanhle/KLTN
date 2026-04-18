import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import colors from 'colors';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Chưa đăng nhập: Thiếu Token'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password').populate('role_id');

      if (!user) {
        return next(new Error('Hồ sơ lỗi: Không tìm thấy User'));
      }

      socket.user = user;
      next();
    } catch (err) {
      console.error('Socket Auth Error:', err.message);
      next(new Error('Xác thực thất bại: Token hết hạn/sai'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Realtime | Client Kết Nối: [${socket.user?.email}] (ID: ${socket.id})`.cyan);

    socket.join(`user_${socket.user._id}`);

    const roleName = socket.user.role_id?.role_name?.toLowerCase() || socket.user.role?.toLowerCase();

    if (socket.user.isAdmin || roleName === 'admin') {
      socket.join('room_admin');
    }
    if (['inventory', 'service', 'sale'].includes(roleName)) {
      socket.join(`room_${roleName}`);
    }

    socket.on('join_room', (roomName) => {
      socket.join(roomName);
      console.log(`${socket.user.email} đã vào phòng [${roomName}]`);
    });

    socket.on('leave_room', (roomName) => {
      socket.leave(roomName);
    });

    socket.on('disconnect', () => {
      console.log(` Realtime | Thu hồi kết nối: [${socket.user?.email}]`.gray);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io chưa được khởi tạo!');
  }
  return io;
};
