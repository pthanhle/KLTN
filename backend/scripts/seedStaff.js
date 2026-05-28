import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/userModel.js'
import Staff from '../models/staffModel.js'
import Role from '../models/roleModel.js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

const mockStaffData = [
  {
    employeeId: "SLS-089",
    fullName: "Phạm Thị Lan Anh",
    email: "sales@gmail.com",
    phone: "+84 906239054",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    roleName: "SALES_EXECUTIVE",
    department: "Showroom Floor",
    baseSalary: 8000000,
    kpiType: "COMMISSION",
    kpiValue: 2.5,
    isOvertimeEligible: true,
    performance: {
      kpis: {
        revenue: { current: 3500000000, target: 4000000000 },
        csat: { score: 4.6, totalReviews: 45, percentile: "Top 20%" },
      },
      kanban: {
        todo: [
          { id: 'LD-881', status: 'todo', title: 'Lịch lái thử xe CR-V', priority: 'URGENT', sla: '2h', customerName: 'Phạm Anh Tuấn', customerPhone: '0901234567', vehicleModel: 'Honda CR-V', appointmentTime: '14:00', taskType: 'TEST_DRIVE', description: 'Khách VIP quan tâm bản L 1 cầu. Đã chốt thời gian lái thử tại showroom.', locationType: 'SHOWROOM', licensePlate: '51H-123.45', address: 'Showroom Quận 7' }
        ],
        inProgress: [
          { id: 'CS-102', status: 'confirmed', taskType: 'CONSULTATION', title: 'Tư vấn giá lăn bánh CR-V', priority: 'HIGH', progress: 50, customerName: 'Hoàng Minh', description: 'Cần gửi bảng chiết tính trả góp 80% qua ngân hàng VIB.', billed: '1.1 Tỷ' },
          { id: 'LD-870', status: 'in_progress', taskType: 'CONTRACT', title: 'Ký hợp đồng Ford Everest', priority: 'HIGH', progress: 90, customerName: 'Bùi Minh Sơn', locationType: 'HOME', address: 'Quận 2, TP.HCM', billed: '1.45 Tỷ', description: 'Giao xe và ký hợp đồng tận nhà khách.' }
        ],
        done: [
          { id: 'LD-865', status: 'done', taskType: 'DELIVERY', title: 'Giao xe Tucson', priority: 'LOW', customerName: 'Vũ Thanh Bình', vehicleModel: 'Hyundai Tucson', billed: '950 Tr' }
        ]
      }
    }
  },
  {
    employeeId: "ADV-012",
    fullName: "Trần Minh Quân",
    email: "advisor@gmail.com",
    phone: "+84 902891738",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    roleName: "SERVICE_ADVISOR",
    department: "Customer Service",
    baseSalary: 12000000,
    kpiType: "COMMISSION",
    kpiValue: 3.5,
    isOvertimeEligible: true,
    performance: {
      kpis: {
        revenue: { current: 120000000, target: 150000000 },
        csat: { score: 4.8, totalReviews: 124, percentile: "Top 5% Regional" }
      },
      kanban: {
        todo: [
          { id: 'RO-101', status: 'todo', title: 'Booking: Khách VIP bảo dưỡng', priority: 'HIGH', sla: '2h', customerName: 'Lê Trần B', vehicleModel: 'BMW 320i', appointmentTime: '11:00' }
        ],
        inProgress: [
          { id: 'RO-105', status: 'in_progress', title: 'Báo giá đại tu chờ duyệt', priority: 'HIGH', progress: 65, customerName: 'Nguyễn Quang Dũng', vehicleModel: 'Honda City', appointmentTime: '10:00' }
        ],
        done: [
          { id: 'RO-099', status: 'done', title: 'Đã thanh toán - Chờ giao xe', priority: 'LOW', customerName: 'Phạm Văn Hương', vehicleModel: 'Hyundai SantaFe' }
        ]
      }
    }
  },
  {
    employeeId: "TEC-042",
    fullName: "Đặng Thái Sơn",
    email: "tech@gmail.com",
    phone: "+84 905291502",
    avatarUrl: "https://randomuser.me/api/portraits/men/78.jpg",
    roleName: "LEAD_TECHNICIAN", 
    department: "Repair Workshop",
    baseSalary: 15000000,
    kpiType: "FLAT_RATE",
    kpiValue: 250000,
    isOvertimeEligible: true,
    performance: {
      kpis: {
        csat: { score: 4.5, totalReviews: 89, percentile: "Top 15%" },
        efficiency: { billed: 185, clocked: 160, rate: 115 },
        rework: { rate: 2.1, trend: -0.4 }
      },
      kanban: {
        todo: [
          { id: 'RO-201', status: 'todo', title: 'Khám xe & Lên Checklist lỗi', priority: 'HIGH', sla: '24h', vehicleModel: 'Mercedes C200', appointmentTime: '08:00' }
        ],
        inProgress: [
          { id: 'RO-195', status: 'in_progress', title: 'Đang tháo cụm lốc điều hoà', priority: 'MEDIUM', progress: 80, vehicleModel: 'Mazda 3', appointmentTime: '11:00' }
        ],
        done: [
          { id: 'RO-180', status: 'done', title: 'Hoàn thành bảo dưỡng', priority: 'LOW', billed: '4h', vehicleModel: 'Toyota Camry', appointmentTime: '14:00' }
        ]
      }
    }
  },
  {
    employeeId: "INV-112",
    fullName: "Đỗ Tiến Huy",
    email: "kho@gmail.com",
    phone: "+84 909784467",
    avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    roleName: "INVENTORY_MGR",
    department: "Logistics",
    baseSalary: 14000000,
    kpiType: "SALARY_ONLY",
    kpiValue: 0,
    isOvertimeEligible: true,
    performance: {
      kpis: {
        inventoryAccuracy: { score: 99.8, target: 99.0 },
        avgSla: { time: 1.2, unit: 'h' }
      },
      kanban: {
        todo: [
          { id: 'PO-551', status: 'todo', title: 'Web Order: Khách đặt lốp Michelin', priority: 'HIGH', sla: '2h', vehicleModel: 'Porsche Macan', appointmentTime: '13:00' }
        ],
        inProgress: [
          { id: 'IV-220', status: 'in_progress', title: 'Đang đóng gói lốp gửi Viettel Post', priority: 'MEDIUM', progress: 60, vehicleModel: 'Toyota Camry', appointmentTime: '09:00' }
        ],
        done: [
          { id: 'IV-210', status: 'done', title: 'Đã xuất 4 lốp xe cho KTV (RO-099)', priority: 'HIGH', vehicleModel: 'Mercedes C200', appointmentTime: '09:00' }
        ]
      }
    }
  }
]

const seedData = async () => {
  try {
    await connectDB()

    console.log('Clearing old staff and user test data...')
    for (const mock of mockStaffData) {
      const existingUser = await User.findOne({ 
        $or: [
          { email: mock.email },
          { username: mock.employeeId.toLowerCase() }
        ]
      })
      
      if (existingUser) {
        await Staff.findOneAndDelete({ user_id: existingUser._id })
        await User.findOneAndDelete({ _id: existingUser._id })
      }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash("123456", salt)

    for (const mock of mockStaffData) {
      let role = await Role.findOne({ role_name: mock.roleName })
      if (!role) {
        role = await Role.create({ role_name: mock.roleName })
      }

      const user = await User.create({
        email: mock.email,
        username: mock.employeeId.toLowerCase(),
        password: hashedPassword, // bypass mongoose pre-save if creating directly, but wait, mongoose User schema might hash it again if we use User.create. Let's provide raw password.
        phone: mock.phone,
        full_name: mock.fullName,
        avatar: mock.avatarUrl,
        role_id: role._id,
        status: 'active',
        isEmailVerified: true
      })
      // Correct password since User.create will trigger pre('save') hash
      user.password = "123456" 
      await user.save()

      await Staff.create({
        user_id: user._id,
        employeeId: mock.employeeId,
        department: mock.department,
        status: 'ACTIVE',
        baseSalary: mock.baseSalary,
        kpiType: mock.kpiType,
        kpiValue: mock.kpiValue,
        isOvertimeEligible: mock.isOvertimeEligible,
        performance: mock.performance
      })

      console.log(`Created staff: ${mock.employeeId} - ${mock.fullName}`)
    }

    console.log('Seed Staff completed successfully')
    process.exit()
  } catch (error) {
    console.error(`Error with seedStaff: ${error.message}`)
    process.exit(1)
  }
}

seedData()
