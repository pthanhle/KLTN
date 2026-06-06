/**
 * Seed script – fills realistic data for all required collections.
 * Safe to run multiple times (skips existing records).
 *
 * Run:  node --env-file=.env scripts/seedDatabase.js
 */
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import Staff from '../models/staffModel.js'
import Role from '../models/roleModel.js'
import Part from '../models/partModel.js'
import PartCategory from '../models/partCategoryModel.js'
import PartBrand from '../models/partBrandModel.js'
import Brand from '../models/brandModel.js'
import Category from '../models/categoryModel.js'
import ServiceItem from '../models/serviceItemModel.js'
import ServiceCategory from '../models/serviceCategoryModel.js'

// ─────────────────────── DB ───────────────────────
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI)
  console.log(`✅ MongoDB: ${conn.connection.host}`)
}

// ─────────────────────── STAFF ────────────────────
// role must match authMiddleware: advisor | service | sale | inventory
const STAFF = [
  // ── Cố vấn dịch vụ (advisor) ─────────────────────────────────────────
  { id: 'ADV-002', name: 'Nguyễn Thị Thu Hà',    email: 'adv.thuha@autocare.vn',   phone: '0912345602', role: 'advisor',   dept: 'Dịch vụ khách hàng', salary: 12_000_000, avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
  { id: 'ADV-003', name: 'Lê Văn Phong',          email: 'adv.phong@autocare.vn',   phone: '0912345603', role: 'advisor',   dept: 'Dịch vụ khách hàng', salary: 11_500_000, avatar: 'https://randomuser.me/api/portraits/men/22.jpg'   },
  { id: 'ADV-004', name: 'Phạm Thị Ngọc Mai',     email: 'adv.ngocmai@autocare.vn', phone: '0912345604', role: 'advisor',   dept: 'Dịch vụ khách hàng', salary: 11_000_000, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 'ADV-005', name: 'Hoàng Đức Bảo',         email: 'adv.bao@autocare.vn',     phone: '0912345605', role: 'advisor',   dept: 'Dịch vụ khách hàng', salary: 12_500_000, avatar: 'https://randomuser.me/api/portraits/men/36.jpg'   },
  { id: 'ADV-006', name: 'Vũ Thị Lan Anh',        email: 'adv.lananh@autocare.vn',  phone: '0912345606', role: 'advisor',   dept: 'Dịch vụ khách hàng', salary: 10_500_000, avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { id: 'ADV-007', name: 'Nguyễn Trung Hiếu',     email: 'adv.hieu@autocare.vn',    phone: '0912345607', role: 'advisor',   dept: 'Dịch vụ khách hàng', salary: 13_000_000, avatar: 'https://randomuser.me/api/portraits/men/48.jpg'   },

  // ── Kỹ thuật viên (service) ──────────────────────────────────────────
  { id: 'KTV-002', name: 'Nguyễn Văn Hùng',       email: 'ktv.hung@autocare.vn',    phone: '0923456702', role: 'service',   dept: 'Xưởng sửa chữa',    salary: 13_000_000, avatar: 'https://randomuser.me/api/portraits/men/42.jpg'   },
  { id: 'KTV-003', name: 'Trần Quốc Bảo',         email: 'ktv.bao@autocare.vn',     phone: '0923456703', role: 'service',   dept: 'Xưởng sửa chữa',    salary: 11_000_000, avatar: 'https://randomuser.me/api/portraits/men/51.jpg'   },
  { id: 'KTV-004', name: 'Phạm Văn Minh',         email: 'ktv.minh@autocare.vn',    phone: '0923456704', role: 'service',   dept: 'Xưởng sửa chữa',    salary: 12_000_000, avatar: 'https://randomuser.me/api/portraits/men/63.jpg'   },
  { id: 'KTV-005', name: 'Lê Duy Khang',          email: 'ktv.khang@autocare.vn',   phone: '0923456705', role: 'service',   dept: 'Xưởng sửa chữa',    salary: 10_500_000, avatar: 'https://randomuser.me/api/portraits/men/71.jpg'   },
  { id: 'KTV-006', name: 'Võ Thanh Nam',          email: 'ktv.nam@autocare.vn',     phone: '0923456706', role: 'service',   dept: 'Xưởng sửa chữa',    salary: 14_000_000, avatar: 'https://randomuser.me/api/portraits/men/82.jpg'   },
  { id: 'KTV-007', name: 'Đinh Công Tuấn',        email: 'ktv.tuan@autocare.vn',    phone: '0923456707', role: 'service',   dept: 'Xưởng điện tử',     salary: 15_000_000, avatar: 'https://randomuser.me/api/portraits/men/90.jpg'   },

  // ── Nhân viên kinh doanh (sale) ─────────────────────────────────────
  { id: 'SLS-002', name: 'Nguyễn Hoàng Nam',      email: 'sale.nam@autocare.vn',    phone: '0934567802', role: 'sale',      dept: 'Kinh doanh',         salary:  8_500_000, avatar: 'https://randomuser.me/api/portraits/men/28.jpg'   },
  { id: 'SLS-003', name: 'Trần Thị Bảo Châu',    email: 'sale.chau@autocare.vn',   phone: '0934567803', role: 'sale',      dept: 'Kinh doanh',         salary:  9_000_000, avatar: 'https://randomuser.me/api/portraits/women/29.jpg' },
  { id: 'SLS-004', name: 'Lê Minh Tú',            email: 'sale.tu@autocare.vn',     phone: '0934567804', role: 'sale',      dept: 'Kinh doanh',         salary:  8_000_000, avatar: 'https://randomuser.me/api/portraits/men/39.jpg'   },
  { id: 'SLS-005', name: 'Đỗ Thị Hương Giang',   email: 'sale.giang@autocare.vn',  phone: '0934567805', role: 'sale',      dept: 'Kinh doanh',         salary:  9_500_000, avatar: 'https://randomuser.me/api/portraits/women/47.jpg' },
  { id: 'SLS-006', name: 'Bùi Văn Sơn',          email: 'sale.son@autocare.vn',    phone: '0934567806', role: 'sale',      dept: 'Kinh doanh',         salary:  8_200_000, avatar: 'https://randomuser.me/api/portraits/men/58.jpg'   },

  // ── Nhân viên kho (inventory) ────────────────────────────────────────
  { id: 'INV-002', name: 'Nguyễn Thị Thủy',      email: 'inv.thuy@autocare.vn',    phone: '0945678902', role: 'inventory', dept: 'Kho vận',            salary:  9_000_000, avatar: 'https://randomuser.me/api/portraits/women/61.jpg' },
  { id: 'INV-003', name: 'Trần Văn Dũng',        email: 'inv.dung@autocare.vn',    phone: '0945678903', role: 'inventory', dept: 'Kho vận',            salary: 10_000_000, avatar: 'https://randomuser.me/api/portraits/men/67.jpg'   },
  { id: 'INV-004', name: 'Phạm Ngọc Toàn',       email: 'inv.toan@autocare.vn',    phone: '0945678904', role: 'inventory', dept: 'Kho vận',            salary:  9_500_000, avatar: 'https://randomuser.me/api/portraits/men/74.jpg'   },
  { id: 'INV-005', name: 'Lê Thị Kim Anh',       email: 'inv.kimanh@autocare.vn',  phone: '0945678905', role: 'inventory', dept: 'Kho vận',            salary:  8_800_000, avatar: 'https://randomuser.me/api/portraits/women/79.jpg' },
  { id: 'INV-006', name: 'Vũ Đình Long',         email: 'inv.long@autocare.vn',    phone: '0945678906', role: 'inventory', dept: 'Kho vận',            salary: 11_000_000, avatar: 'https://randomuser.me/api/portraits/men/88.jpg'   },
]

// ─────────────────────── PART CATEGORIES ──────────────────────────────
const PART_CATEGORIES = [
  { name: 'Bộ lọc',                 value: 'bo-loc',           description: 'Lọc dầu, lọc gió, lọc nhiên liệu, lọc cabin' },
  { name: 'Hệ thống phanh',         value: 'he-thong-phanh',   description: 'Má phanh, đĩa phanh, cụm phanh, dầu phanh' },
  { name: 'Hệ thống làm mát',       value: 'he-thong-lam-mat', description: 'Két nước, bơm nước, bình nước phụ, nước làm mát' },
  { name: 'Bugi & Hệ thống điện',   value: 'bugi-dien',        description: 'Bugi, dây cao áp, bobine, cảm biến' },
  { name: 'Lốp xe & Bánh xe',       value: 'lop-xe-banh-xe',   description: 'Lốp xe các loại, vành, van lốp, thiết bị nâng' },
  { name: 'Ắc quy',                 value: 'ac-quy',           description: 'Ắc quy xe ô tô các loại, phụ kiện ắc quy' },
  { name: 'Đèn & Chiếu sáng',       value: 'den-chieu-sang',   description: 'Đèn pha, đèn hậu, đèn xi nhan, bóng đèn xe' },
  { name: 'Hệ thống treo',          value: 'he-thong-treo',    description: 'Giảm xóc, lò xo, cao su treo, cầu nối' },
  { name: 'Truyền động',            value: 'truyen-dong',      description: 'Curoa, dây curoa, trục láp, khớp nối, ly hợp' },
  { name: 'Dầu & Dung dịch',        value: 'dau-dung-dich',    description: 'Dầu động cơ, dầu hộp số, dầu trợ lực, nước rửa kính' },
  { name: 'Gạt mưa & Kính',         value: 'gat-mua-kinh',     description: 'Gạt mưa, cao su gạt, nước rửa kính, phim cách nhiệt' },
  { name: 'Điều hòa & Làm lạnh',    value: 'dieu-hoa-lam-lanh',description: 'Máy lạnh, ga điều hòa, bộ sấy, quạt tản nhiệt' },
]

// ─────────────────────── PART BRANDS ──────────────────────────────────
const PART_BRANDS = [
  { name: 'Bosch',      description: 'Thương hiệu phụ tùng Đức, chuyên về hệ thống điện & phun xăng' },
  { name: 'NGK',        description: 'Hãng bugi hàng đầu thế giới, xuất xứ Nhật Bản' },
  { name: 'Denso',      description: 'Linh kiện OEM Nhật Bản cho Toyota, Honda, Lexus' },
  { name: 'Brembo',     description: 'Chuyên phanh xe hiệu suất cao, xuất xứ Ý' },
  { name: 'Michelin',   description: 'Lốp xe cao cấp hàng đầu thế giới, xuất xứ Pháp' },
  { name: 'Bridgestone', description: 'Lốp xe Nhật Bản, một trong những thương hiệu lốn nhất thế giới' },
  { name: 'Yokohama',   description: 'Lốp xe thể thao & SUV, xuất xứ Nhật Bản' },
  { name: 'Exide',      description: 'Ắc quy xe ô tô cao cấp, xuất xứ Mỹ' },
  { name: 'GS Yuasa',   description: 'Ắc quy Nhật Bản, OEM cho nhiều hãng xe' },
  { name: 'Gates',      description: 'Chuyên curoa, dây đai động cơ, phụ kiện truyền động' },
  { name: 'ACDelco',    description: 'Phụ tùng chính hãng GM, đa dạng chủng loại' },
  { name: 'Castrol',    description: 'Dầu nhớt động cơ & hộp số cao cấp' },
  { name: 'Mobil 1',    description: 'Dầu nhớt tổng hợp toàn phần hiệu suất cao' },
  { name: 'Shell Helix', description: 'Dầu nhớt Shell, công nghệ Active Cleansing' },
  { name: 'Bilstein',   description: 'Giảm xóc hiệu suất cao cho xe thể thao & SUV' },
  { name: 'Monroe',     description: 'Giảm xóc & hệ thống treo phổ thông đến cao cấp' },
  { name: 'Philips',    description: 'Bóng đèn xe ô tô Xenon, LED, Halogen' },
  { name: 'Osram',      description: 'Chiếu sáng ô tô chuyên nghiệp, xuất xứ Đức' },
]

// ─────────────────────── CAR BRANDS ───────────────────────────────────
const CAR_BRANDS = [
  { name: 'Toyota',       is_partner: true,  description: 'Thương hiệu ô tô Nhật Bản hàng đầu tại Việt Nam' },
  { name: 'Honda',        is_partner: true,  description: 'Xe Nhật Bản nổi tiếng với độ bền và tiết kiệm nhiên liệu' },
  { name: 'Hyundai',      is_partner: true,  description: 'Thương hiệu Hàn Quốc với thiết kế hiện đại' },
  { name: 'Kia',          is_partner: true,  description: 'Xe Hàn Quốc đa dạng phân khúc, giá trị tốt' },
  { name: 'BMW',          is_partner: false, description: 'Xe sang Đức, biểu tượng của sự thể thao và đẳng cấp' },
  { name: 'Mercedes-Benz',is_partner: false, description: 'Hãng xe sang lâu đời nhất thế giới, xuất xứ Đức' },
  { name: 'Audi',         is_partner: false, description: 'Xe sang Đức với công nghệ quattro nổi tiếng' },
  { name: 'Ford',         is_partner: true,  description: 'Thương hiệu Mỹ với dòng SUV và bán tải phổ biến' },
  { name: 'Mazda',        is_partner: true,  description: 'Xe Nhật Bản với thiết kế KODO tinh tế' },
  { name: 'Mitsubishi',   is_partner: true,  description: 'Xe Nhật đa dụng, mạnh mẽ với dòng Outlander, Xpander' },
  { name: 'Volkswagen',   is_partner: false, description: 'Thương hiệu Đức, kỹ thuật Châu Âu chính thống' },
  { name: 'Lexus',        is_partner: false, description: 'Thương hiệu xe sang của Toyota, phong cách Nhật Bản' },
  { name: 'Subaru',       is_partner: false, description: 'Xe Nhật Bản với hệ thống AWD Symmetrical nổi tiếng' },
  { name: 'Peugeot',      is_partner: false, description: 'Thương hiệu xe Pháp thanh lịch với lịch sử lâu đời' },
  { name: 'Volvo',        is_partner: false, description: 'Xe Thụy Điển, an toàn hàng đầu thế giới' },
]

// ─────────────────────── PRODUCT CATEGORIES (for shop) ─────────────────
const PRODUCT_CATEGORIES = [
  { category_name: 'Dầu nhớt & Dung dịch',    description: 'Dầu động cơ, dầu hộp số, nước làm mát, dầu phanh' },
  { category_name: 'Lốp xe & Vành',            description: 'Lốp xe các loại, vành đúc, vành mâm OEM & aftermarket' },
  { category_name: 'Phụ tùng động cơ',         description: 'Lọc dầu, bugi, dây curoa, bơm nước, xu pắp' },
  { category_name: 'Hệ thống phanh',           description: 'Má phanh, đĩa phanh, heo dầu, dầu phanh' },
  { category_name: 'Điện – Ắc quy – Chiếu sáng', description: 'Ắc quy, đèn LED/Xenon, cảm biến, cầu chì' },
  { category_name: 'Phụ kiện & Chăm sóc xe',   description: 'Dung dịch rửa xe, ghế ngồi, thảm sàn, gương chiếu hậu' },
  { category_name: 'Hệ thống treo & Lái',      description: 'Giảm xóc, lò xo, rô tuyn, thanh cân bằng' },
  { category_name: 'Điều hòa không khí',       description: 'Lọc cabin, máy nén, ga lạnh R134a, bộ sưởi' },
]

// ─────────────────────── SERVICE CATEGORIES ───────────────────────────
const SERVICE_CATEGORIES = [
  { name: 'Bảo dưỡng định kỳ',      icon: 'Calendar',   description: 'Các gói bảo dưỡng theo km và thời gian' },
  { name: 'Hệ thống phanh',         icon: 'Disc',       description: 'Kiểm tra, thay thế, vệ sinh hệ thống phanh' },
  { name: 'Động cơ & Hộp số',       icon: 'Cog',        description: 'Sửa chữa động cơ, hộp số tự động và số sàn' },
  { name: 'Hệ thống điện & Điện tử',icon: 'Zap',        description: 'Chẩn đoán điện, sửa lỗi cảm biến, ECU' },
  { name: 'Điều hòa không khí',     icon: 'Wind',       description: 'Nạp gas, vệ sinh giàn lạnh, thay lọc cabin' },
  { name: 'Hệ thống lái & Treo',    icon: 'Navigation', description: 'Căn chỉnh góc lái, thay giảm xóc, rô tuyn' },
  { name: 'Lốp xe & Cân bằng',      icon: 'Circle',     description: 'Thay lốp, cân bằng động, vá lốp, bơm hơi' },
  { name: 'Ngoại thất & Sơn xe',    icon: 'Paintbrush', description: 'Đánh bóng, phủ ceramic, sửa xước, phục hồi sơn' },
  { name: 'Rửa xe & Chăm sóc',      icon: 'Droplets',   description: 'Rửa xe, vệ sinh nội thất, khử mùi, hút bụi' },
  { name: 'Đăng kiểm & Hỗ trợ',    icon: 'ClipboardCheck', description: 'Hỗ trợ đăng kiểm, kiểm tra tổng quát' },
]

// ─────────────────────── SERVICE ITEMS ────────────────────────────────
// category index matches SERVICE_CATEGORIES above (resolved after insert)
const SERVICE_ITEMS_DATA = [
  // Bảo dưỡng định kỳ
  { sku: 'SVC-BD-5K',   serviceName: 'Bảo dưỡng 5.000 km',           priceType: 'STARTING_AT', basePrice:  650_000, estimatedDuration: 60,  isPackage: true,  catIdx: 0, description: 'Thay dầu máy, lọc dầu, kiểm tra 24 hạng mục, bơm lốp chuẩn áp' },
  { sku: 'SVC-BD-10K',  serviceName: 'Bảo dưỡng 10.000 km',          priceType: 'STARTING_AT', basePrice:  980_000, estimatedDuration: 90,  isPackage: true,  catIdx: 0, description: 'Thay dầu máy, lọc dầu, lọc gió, kiểm tra 36 hạng mục, vệ sinh buồng đốt' },
  { sku: 'SVC-BD-20K',  serviceName: 'Bảo dưỡng 20.000 km',          priceType: 'STARTING_AT', basePrice: 1_850_000, estimatedDuration: 120, isPackage: true,  catIdx: 0, description: 'Gói bảo dưỡng toàn diện: thay dầu, lọc, bugi, căn chỉnh góc lái, kiểm tra 50 hạng mục' },
  { sku: 'SVC-BD-40K',  serviceName: 'Bảo dưỡng 40.000 km',          priceType: 'STARTING_AT', basePrice: 3_200_000, estimatedDuration: 180, isPackage: true,  catIdx: 0, description: 'Đại bảo dưỡng: thay dầu, các loại lọc, bugi, thau rửa hộp số, kiểm tra toàn bộ gầm' },
  { sku: 'SVC-DAYNOT',  serviceName: 'Thay dầu nhớt & lọc dầu',      priceType: 'STARTING_AT', basePrice:  350_000, estimatedDuration: 30,  isPackage: false, catIdx: 0, description: 'Thay dầu nhớt động cơ và lọc dầu, vệ sinh nắp đổ dầu' },

  // Hệ thống phanh
  { sku: 'SVC-PH-MA',   serviceName: 'Thay má phanh trước',          priceType: 'STARTING_AT', basePrice:  850_000, estimatedDuration: 60,  isPackage: false, catIdx: 1, description: 'Thay má phanh trước, kiểm tra đĩa phanh, vệ sinh cụm phanh' },
  { sku: 'SVC-PH-TOAN', serviceName: 'Kiểm tra & sửa hệ thống phanh', priceType: 'CONTACT',    basePrice:        0, estimatedDuration: 90,  isPackage: false, catIdx: 1, description: 'Chẩn đoán, kiểm tra đĩa phanh, má phanh, heo dầu, ống dẫn phanh' },
  { sku: 'SVC-PH-DAU',  serviceName: 'Thau rửa dầu phanh',           priceType: 'FIXED',       basePrice:  380_000, estimatedDuration: 45,  isPackage: false, catIdx: 1, description: 'Thau rửa toàn bộ dầu phanh cũ, nạp dầu phanh DOT4 mới' },

  // Động cơ & Hộp số
  { sku: 'SVC-DG-BPXE',  serviceName: 'Chẩn đoán lỗi bằng máy scan', priceType: 'FIXED',      basePrice:  250_000, estimatedDuration: 30,  isPackage: false, catIdx: 2, description: 'Đọc mã lỗi OBD2, xuất báo cáo lỗi chuyên sâu' },
  { sku: 'SVC-DG-DAILUC', serviceName: 'Đại tu động cơ',               priceType: 'CONTACT',   basePrice:        0, estimatedDuration: 1440,isPackage: false, catIdx: 2, description: 'Đại tu động cơ toàn bộ: mài xy lanh, thay xéc măng, bạc biên, kiểm tra trục khuỷu' },
  { sku: 'SVC-HOP-AUTO',  serviceName: 'Thau rửa hộp số tự động',     priceType: 'STARTING_AT', basePrice: 1_200_000, estimatedDuration: 120, isPackage: false, catIdx: 2, description: 'Thau rửa hộp số AT, thay dầu hộp số, vệ sinh lọc hộp số' },

  // Điện & Điện tử
  { sku: 'SVC-EL-KTOAN', serviceName: 'Kiểm tra hệ thống điện',       priceType: 'FIXED',      basePrice:  200_000, estimatedDuration: 45,  isPackage: false, catIdx: 3, description: 'Kiểm tra ắc quy, máy phát, máy đề, hệ thống đèn chiếu sáng' },
  { sku: 'SVC-EL-ACQUY', serviceName: 'Thay ắc quy',                  priceType: 'STARTING_AT', basePrice:  120_000, estimatedDuration: 20,  isPackage: false, catIdx: 3, description: 'Thay ắc quy xe ô tô, kiểm tra hệ thống nạp, bảo hành 12 tháng' },

  // Điều hòa
  { sku: 'SVC-AC-GAS',   serviceName: 'Nạp gas điều hòa R134a',      priceType: 'STARTING_AT', basePrice:  380_000, estimatedDuration: 60,  isPackage: false, catIdx: 4, description: 'Hút gas cũ, kiểm tra rò rỉ, nạp gas R134a theo tiêu chuẩn nhà sản xuất' },
  { sku: 'SVC-AC-VSACH', serviceName: 'Vệ sinh giàn lạnh điều hòa',  priceType: 'FIXED',       basePrice:  450_000, estimatedDuration: 90,  isPackage: false, catIdx: 4, description: 'Vệ sinh giàn lạnh, giàn nóng, quạt gió, khử khuẩn & khử mùi điều hòa' },

  // Lái & Treo
  { sku: 'SVC-TS-CANH',  serviceName: 'Căn chỉnh góc lái (Wheel Alignment)', priceType: 'FIXED', basePrice: 350_000, estimatedDuration: 60, isPackage: false, catIdx: 5, description: 'Căn chỉnh 4 góc bánh xe bằng máy 3D Hunter chính xác' },
  { sku: 'SVC-TS-LOXO',  serviceName: 'Thay giảm xóc',               priceType: 'STARTING_AT', basePrice: 1_500_000, estimatedDuration: 120, isPackage: false, catIdx: 5, description: 'Thay giảm xóc, kiểm tra cao su treo, lò xo, cân bằng lại sau thay' },

  // Lốp xe
  { sku: 'SVC-LOP-THAY', serviceName: 'Thay lốp xe (1 lốp)',         priceType: 'STARTING_AT', basePrice:  100_000, estimatedDuration: 30,  isPackage: false, catIdx: 6, description: 'Tháo lốp cũ, lắp lốp mới, cân bằng động, kiểm tra áp suất' },
  { sku: 'SVC-LOP-CBD',  serviceName: 'Cân bằng động 4 bánh',        priceType: 'FIXED',       basePrice:  200_000, estimatedDuration: 30,  isPackage: false, catIdx: 6, description: 'Cân bằng động 4 bánh xe bằng máy Hunter, giảm rung xe tay lái' },
  { sku: 'SVC-LOP-VA',   serviceName: 'Vá lốp xe (vá nóng)',         priceType: 'FIXED',       basePrice:   80_000, estimatedDuration: 20,  isPackage: false, catIdx: 6, description: 'Vá lốp theo phương pháp vá nóng, đảm bảo kín hoàn toàn, bền lâu' },

  // Rửa xe
  { sku: 'SVC-RX-TCAN',  serviceName: 'Rửa xe tiêu chuẩn',           priceType: 'FIXED',       basePrice:   80_000, estimatedDuration: 20,  isPackage: false, catIdx: 8, description: 'Rửa xe ngoài, lau khô, vệ sinh nội thất cơ bản' },
  { sku: 'SVC-RX-VIP',   serviceName: 'Rửa xe VIP & nội thất',       priceType: 'FIXED',       basePrice:  250_000, estimatedDuration: 60,  isPackage: false, catIdx: 8, description: 'Rửa xe tỉ mỉ, hút bụi nội thất, vệ sinh bảng táp lô, đánh bóng vành' },
  { sku: 'SVC-RX-PKT',   serviceName: 'Phủ Ceramic Paint Protection', priceType: 'STARTING_AT', basePrice: 5_500_000, estimatedDuration: 480, isPackage: true, catIdx: 7, description: 'Phủ lớp bảo vệ ceramic 9H, chống xước, chống UV, chống bẩn dài hạn' },
]

// ─────────────────────── PARTS ────────────────────────────────────────
// catValue matches PART_CATEGORIES value field
const PARTS_DATA = [
  // Bộ lọc
  { sku:'PT-LOC-001', name:'Lọc dầu Bosch P3337 (Toyota Camry 2.5)',       category:'bo-loc',           brand:'Bosch',     price: 185_000, orig: 210_000, stock: 50, cond:'new', compatible:['Toyota'], specs:[{label:'Mã OEM',value:'90915-03003'},{label:'Thread',value:'3/4-16 UNF'}] },
  { sku:'PT-LOC-002', name:'Lọc gió động cơ Denso (Honda CR-V 1.5T)',       category:'bo-loc',           brand:'Denso',     price: 320_000, orig: 380_000, stock: 40, cond:'new', compatible:['Honda'], specs:[{label:'Mã OEM',value:'17220-5PA-A00'},{label:'Kích thước',value:'306x175x45 mm'}] },
  { sku:'PT-LOC-003', name:'Lọc nhiên liệu Bosch (Hyundai Tucson)',          category:'bo-loc',           brand:'Bosch',     price: 250_000, orig: 290_000, stock: 30, cond:'new', compatible:['Hyundai'], specs:[{label:'Mã OEM',value:'31911-2B900'}] },
  { sku:'PT-LOC-004', name:'Lọc cabin Bosch (Toyota Fortuner)',              category:'bo-loc',           brand:'Bosch',     price: 145_000, orig: 170_000, stock: 60, cond:'new', compatible:['Toyota'], specs:[{label:'Mã OEM',value:'87139-0K010'},{label:'Loại lọc',value:'Lọc kép than hoạt tính'}] },

  // Bugi & Điện
  { sku:'PT-BUG-001', name:'Bugi NGK Iridium IX BKR6EIX (Mazda 3 2.0)',    category:'bugi-dien',        brand:'NGK',       price: 165_000, orig: 195_000, stock: 80, cond:'new', compatible:['Mazda'], specs:[{label:'Loại',value:'Iridium'},{label:'Heat Range',value:'6'},{label:'Gap',value:'0.8 mm'}] },
  { sku:'PT-BUG-002', name:'Bugi NGK Laser Iridium ILFR6T11 (Toyota Camry)',category:'bugi-dien',        brand:'NGK',       price: 210_000, orig: 250_000, stock: 60, cond:'new', compatible:['Toyota'], specs:[{label:'Loại',value:'Laser Iridium'},{label:'Gap',value:'1.1 mm'}] },
  { sku:'PT-BUG-003', name:'Bugi Denso Iridium Power IK20 (Honda City)',     category:'bugi-dien',        brand:'Denso',     price: 185_000, orig: 220_000, stock: 70, cond:'new', compatible:['Honda'], specs:[{label:'Loại',value:'Iridium Power'},{label:'Thread',value:'M14×1.25'}] },
  { sku:'PT-BUG-004', name:'Cảm biến oxy Bosch (Toyota Innova 2.0)',         category:'bugi-dien',        brand:'Bosch',     price: 950_000, orig:1_100_000, stock: 15, cond:'new', compatible:['Toyota'], specs:[{label:'Vị trí',value:'Upstream'},{label:'Số dây',value:'4'}] },

  // Phanh
  { sku:'PT-PH-001',  name:'Má phanh trước Brembo (BMW 3 Series)',          category:'he-thong-phanh',   brand:'Brembo',    price:1_650_000, orig:1_900_000, stock: 20, cond:'new', compatible:['BMW'], specs:[{label:'Mã Brembo',value:'P06020'},{label:'Vị trí',value:'Trước'}] },
  { sku:'PT-PH-002',  name:'Đĩa phanh trước Brembo (Mercedes C200)',        category:'he-thong-phanh',   brand:'Brembo',    price:2_800_000, orig:3_200_000, stock: 10, cond:'new', compatible:['Mercedes-Benz'], specs:[{label:'Đường kính',value:'300 mm'},{label:'Độ dày',value:'28 mm'}] },
  { sku:'PT-PH-003',  name:'Má phanh sau ACDelco (Chevrolet Trailblazer)',   category:'he-thong-phanh',   brand:'ACDelco',   price: 780_000, orig: 900_000, stock: 25, cond:'new', compatible:['Ford'], specs:[{label:'Vị trí',value:'Sau'},{label:'Loại',value:'Ceramic'}] },
  { sku:'PT-PH-004',  name:'Dầu phanh Bosch DOT4 (500ml)',                  category:'he-thong-phanh',   brand:'Bosch',     price: 125_000, orig: 150_000, stock: 100,cond:'new', compatible:[], specs:[{label:'Tiêu chuẩn',value:'DOT4'},{label:'Dung tích',value:'500 ml'},{label:'Điểm sôi khô',value:'265°C'}] },

  // Làm mát
  { sku:'PT-LM-001',  name:'Nước làm mát Prestone (1.89L)',                 category:'he-thong-lam-mat', brand:'ACDelco',   price: 185_000, orig: 220_000, stock: 80, cond:'new', compatible:[], specs:[{label:'Tỉ lệ pha',value:'50/50 sẵn dùng'},{label:'Bảo vệ chống đông',value:'-37°C'}] },
  { sku:'PT-LM-002',  name:'Két nước nhôm Toyota Camry 2018-2023',           category:'he-thong-lam-mat', brand:'Denso',     price:3_500_000, orig:4_200_000, stock:  8, cond:'new', compatible:['Toyota'], specs:[{label:'Kích thước lõi',value:'653x380x16 mm'},{label:'Vật liệu',value:'Nhôm'}] },
  { sku:'PT-LM-003',  name:'Bơm nước Gates (Honda City 1.5 2021+)',          category:'he-thong-lam-mat', brand:'Gates',     price: 980_000, orig:1_150_000, stock: 15, cond:'new', compatible:['Honda'], specs:[{label:'Mã OEM',value:'19200-5R0-004'}] },

  // Lốp xe
  { sku:'PT-LOP-001', name:'Lốp Michelin Pilot Sport 4 225/45R18',          category:'lop-xe-banh-xe',   brand:'Michelin',  price:3_200_000, orig:3_600_000, stock: 20, cond:'new', compatible:[], specs:[{label:'Kích thước',value:'225/45R18'},{label:'Load Index',value:'91'},{label:'Speed Rating',value:'Y'}] },
  { sku:'PT-LOP-002', name:'Lốp Bridgestone Ecopia EP300 205/65R16',        category:'lop-xe-banh-xe',   brand:'Bridgestone',price:1_850_000, orig:2_100_000, stock: 30, cond:'new', compatible:[], specs:[{label:'Kích thước',value:'205/65R16'},{label:'Load Index',value:'95'},{label:'Speed Rating',value:'V'}] },
  { sku:'PT-LOP-003', name:'Lốp Yokohama Geolandar A/T G015 265/65R17',     category:'lop-xe-banh-xe',   brand:'Yokohama',  price:4_500_000, orig:5_000_000, stock: 12, cond:'new', compatible:[], specs:[{label:'Kích thước',value:'265/65R17'},{label:'Pattern',value:'A/T (All-Terrain)'}] },

  // Ắc quy
  { sku:'PT-ACQ-001', name:'Ắc quy GS Yuasa YBX5027 65Ah (Toyota Innova)',  category:'ac-quy',           brand:'GS Yuasa',  price:2_950_000, orig:3_300_000, stock: 15, cond:'new', compatible:['Toyota'], specs:[{label:'Dung lượng',value:'65 Ah'},{label:'CCA',value:'610 A'},{label:'Kích thước',value:'242x175x190 mm'}] },
  { sku:'PT-ACQ-002', name:'Ắc quy Exide Premium EP742 74Ah (Mercedes)',     category:'ac-quy',           brand:'Exide',     price:3_850_000, orig:4_200_000, stock: 10, cond:'new', compatible:['Mercedes-Benz','BMW'], specs:[{label:'Dung lượng',value:'74 Ah'},{label:'CCA',value:'680 A'},{label:'Cực',value:'L3'}] },

  // Dầu nhớt
  { sku:'PT-DAU-001', name:'Dầu nhớt Castrol Edge 5W-30 LL (4L)',           category:'dau-dung-dich',    brand:'Castrol',   price:  680_000, orig: 780_000, stock:100, cond:'new', compatible:[], specs:[{label:'Độ nhớt',value:'5W-30'},{label:'Tiêu chuẩn',value:'ACEA C3, BMW LL-04'},{label:'Dung tích',value:'4 lít'}] },
  { sku:'PT-DAU-002', name:'Dầu nhớt Mobil 1 Extended Life 10W-60 (4L)',    category:'dau-dung-dich',    brand:'Mobil 1',   price:1_250_000, orig:1_450_000, stock: 60, cond:'new', compatible:[], specs:[{label:'Độ nhớt',value:'10W-60'},{label:'Ứng dụng',value:'Xe thể thao, hiệu suất cao'},{label:'Dung tích',value:'4 lít'}] },
  { sku:'PT-DAU-003', name:'Dầu nhớt Shell Helix Ultra 0W-20 (4L)',         category:'dau-dung-dich',    brand:'Shell Helix',price: 920_000, orig:1_050_000, stock: 80, cond:'new', compatible:[], specs:[{label:'Độ nhớt',value:'0W-20'},{label:'Tiêu chuẩn',value:'API SN PLUS, ILSAC GF-5'},{label:'Dung tích',value:'4 lít'}] },

  // Truyền động
  { sku:'PT-TD-001',  name:'Bộ curoa cam Gates (Toyota Vios 1.5)',           category:'truyen-dong',      brand:'Gates',     price:1_850_000, orig:2_100_000, stock: 12, cond:'new', compatible:['Toyota'], specs:[{label:'Số răng',value:'122T'},{label:'Chiều rộng',value:'25 mm'},{label:'Bao gồm',value:'Dây curoa + con lăn'}] },
  { sku:'PT-TD-002',  name:'Đĩa & bàn ép ly hợp LUK (Honda Accord 2.0)',    category:'truyen-dong',      brand:'ACDelco',   price:4_200_000, orig:4_800_000, stock:  5, cond:'new', compatible:['Honda'], specs:[{label:'Đường kính',value:'228 mm'},{label:'Bao gồm',value:'Đĩa ly hợp + bàn ép + vòng bi cắt'}] },

  // Gạt mưa
  { sku:'PT-GMUON-001',name:'Gạt mưa Bosch Aerotwin 650mm (Toyota Camry)', category:'gat-mua-kinh',     brand:'Bosch',     price: 285_000, orig: 330_000, stock: 50, cond:'new', compatible:['Toyota'], specs:[{label:'Chiều dài',value:'650 mm (26 inch)'},{label:'Loại',value:'Flat/Frameless'}] },
  { sku:'PT-GMUON-002',name:'Gạt mưa Bosch Aerotwin Set Mazda 3 (2019+)',  category:'gat-mua-kinh',     brand:'Bosch',     price: 480_000, orig: 550_000, stock: 35, cond:'new', compatible:['Mazda'], specs:[{label:'Bao gồm',value:'Gạt lái 650mm + gạt phụ 400mm'},{label:'Loại',value:'Flat + Flat'}] },

  // Hệ thống treo
  { sku:'PT-TREO-001', name:'Giảm xóc trước Bilstein B4 (BMW 5 Series F10)', category:'he-thong-treo',   brand:'Bilstein',  price:4_800_000, orig:5_500_000, stock:  6, cond:'new', compatible:['BMW'], specs:[{label:'Loại',value:'Twin-tube'},{label:'Vị trí',value:'Trước'},{label:'Kiểu lắp',value:'Strut'}] },
  { sku:'PT-TREO-002', name:'Bộ giảm xóc Monroe Reflex (Hyundai Tucson)',    category:'he-thong-treo',   brand:'Monroe',    price:2_200_000, orig:2_600_000, stock: 10, cond:'new', compatible:['Hyundai'], specs:[{label:'Bao gồm',value:'2 giảm xóc sau'},{label:'Loại',value:'Gas pressure'}] },

  // Đèn chiếu sáng
  { sku:'PT-DEN-001',  name:'Bóng đèn Osram Night Breaker 200% H4 (bộ 2)', category:'den-chieu-sang',   brand:'Osram',     price: 380_000, orig: 440_000, stock: 40, cond:'new', compatible:[], specs:[{label:'Loại chân',value:'H4 (P43t)'},{label:'Công suất',value:'60/55W'},{label:'Độ sáng',value:'+200% so với tiêu chuẩn'}] },
  { sku:'PT-DEN-002',  name:'Bóng đèn Philips X-tremeVision H7 (bộ 2)',    category:'den-chieu-sang',   brand:'Philips',   price: 420_000, orig: 490_000, stock: 35, cond:'new', compatible:[], specs:[{label:'Loại chân',value:'H7 (PX26d)'},{label:'Công suất',value:'55W'},{label:'Nhiệt độ màu',value:'3500K'}] },
]

// ─────────────────────── HELPERS ──────────────────────────────────────
const upsert = async (Model, query, data, label) => {
  const existing = await Model.findOne(query)
  if (existing) return existing
  const doc = await Model.create(data)
  console.log(`  + ${label}: ${doc.name || doc.category_name || doc.employeeId || doc.sku}`)
  return doc
}

// ─────────────────────── MAIN ─────────────────────────────────────────
const seed = async () => {
  await connectDB()

  // 1. ROLES ─────────────────────────────────────────────────────────────
  console.log('\n── Roles ─────────────────────')
  const ROLE_NAMES = ['admin', 'service', 'advisor', 'sale', 'inventory', 'customer', 'guest']
  const roleMap = {}
  for (const rn of ROLE_NAMES) {
    const r = await upsert(Role, { role_name: rn }, { role_name: rn }, 'Role')
    roleMap[rn] = r._id
  }

  // 2. STAFF ─────────────────────────────────────────────────────────────
  console.log('\n── Staff ─────────────────────')
  const salt = await bcrypt.genSalt(10)
  const hashedPw = await bcrypt.hash('Autocare@2025', salt)

  for (const s of STAFF) {
    const existing = await User.findOne({ $or: [{ email: s.email }, { username: s.id.toLowerCase() }] })
    if (existing) { console.log(`  ~ skip (exists): ${s.id}`); continue }

    const roleId = roleMap[s.role]
    if (!roleId) { console.warn(`  ! role not found: ${s.role}`); continue }

    const user = await User.create({
      username:         s.id.toLowerCase(),
      email:            s.email,
      password:         hashedPw,
      phone:            s.phone,
      full_name:        s.name,
      avatar:           s.avatar,
      role_id:          roleId,
      status:           'active',
      isEmailVerified:  true,
    })
    // Re-save so pre('save') hash does NOT double-hash (we supply pre-hashed)
    // → Because we bypassed mongoose pre-save by using create with already-hashed pw,
    //   we need to reset to raw so the hook hashes correctly.
    user.password = 'Autocare@2025'
    await user.save()

    await Staff.create({
      user_id:          user._id,
      employeeId:       s.id,
      department:       s.dept,
      status:           'ACTIVE',
      baseSalary:       s.salary,
      kpiType:          s.role === 'service' ? 'FLAT_RATE' : 'COMMISSION',
      kpiValue:         s.role === 'service' ? 250_000 : 2.5,
      isOvertimeEligible: true,
    })
    console.log(`  + ${s.id} – ${s.name} (${s.role}) – mật khẩu: Autocare@2025`)
  }

  // 3. PART CATEGORIES ───────────────────────────────────────────────────
  console.log('\n── Part Categories ───────────')
  const partCatMap = {}
  for (const c of PART_CATEGORIES) {
    const doc = await upsert(PartCategory, { value: c.value }, c, 'PartCat')
    partCatMap[c.value] = c.value  // PartModel.category is a plain String (not ref)
  }

  // 4. PART BRANDS ───────────────────────────────────────────────────────
  console.log('\n── Part Brands ───────────────')
  for (const b of PART_BRANDS) {
    await upsert(PartBrand, { name: b.name }, b, 'PartBrand')
  }

  // 5. CAR BRANDS ────────────────────────────────────────────────────────
  console.log('\n── Car Brands ────────────────')
  for (const b of CAR_BRANDS) {
    await upsert(Brand, { name: b.name }, b, 'Brand')
  }

  // 6. PRODUCT CATEGORIES ────────────────────────────────────────────────
  console.log('\n── Product Categories ────────')
  for (const c of PRODUCT_CATEGORIES) {
    await upsert(Category, { category_name: c.category_name }, c, 'Category')
  }

  // 7. SERVICE CATEGORIES ────────────────────────────────────────────────
  console.log('\n── Service Categories ────────')
  const svcCatDocs = []
  for (const c of SERVICE_CATEGORIES) {
    const doc = await upsert(ServiceCategory, { name: c.name }, c, 'SvcCat')
    svcCatDocs.push(doc)
  }

  // 8. SERVICE ITEMS ─────────────────────────────────────────────────────
  console.log('\n── Service Items ─────────────')
  for (const item of SERVICE_ITEMS_DATA) {
    const cat = svcCatDocs[item.catIdx]
    const existing = await ServiceItem.findOne({ sku: item.sku })
    if (existing) { console.log(`  ~ skip: ${item.sku}`); continue }
    await ServiceItem.create({
      sku:               item.sku,
      serviceName:       item.serviceName,
      priceType:         item.priceType,
      basePrice:         item.basePrice,
      estimatedDuration: item.estimatedDuration,
      isPackage:         item.isPackage,
      category:          cat?._id,
      description:       item.description,
      isActive:          true,
    })
    console.log(`  + ${item.sku} – ${item.serviceName}`)
  }

  // 9. PARTS ─────────────────────────────────────────────────────────────
  console.log('\n── Parts ─────────────────────')
  for (const p of PARTS_DATA) {
    const existing = await Part.findOne({ sku: p.sku })
    if (existing) { console.log(`  ~ skip: ${p.sku}`); continue }
    await Part.create({
      name:             p.name,
      sku:              p.sku,
      brand:            p.brand || '',
      category:         p.category,
      condition:        p.cond,
      original_price:   p.orig,
      price:            p.price,
      images:           [],
      compatible_brands:p.compatible,
      inventory: {
        stock_on_hand:   p.stock,
        allocated:       0,
        available_stock: p.stock,
      },
      specs:            p.specs,
      status:           'active',
      sold_count:       Math.floor(Math.random() * 80),
      is_best_seller:   p.stock > 40,
    })
    console.log(`  + ${p.sku} – ${p.name}`)
  }

  console.log('\n✅ Seed hoàn tất!')
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed lỗi:', err.message)
  process.exit(1)
})
