/**
 * Seed script: uploads images to Cloudinary, enriches Parts with landing_blocks,
 * uploads car brand logos, and creates Car documents.
 *
 * Run: node --env-file=.env scripts/seedImagesAndCars.js
 */
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import Part from '../models/partModel.js';
import Brand from '../models/brandModel.js';
import Car from '../models/carModel.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── DB & CLOUDINARY ──────────────────────────────────────────────────────────
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`✅ MongoDB: ${conn.connection.host}`);
};

const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

const uploadFromUrl = async (url, publicId, folder) => {
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder,
      public_id: publicId,
      overwrite: false,
      resource_type: 'image',
    });
    return result.secure_url;
  } catch (err) {
    console.warn(`  ⚠ Upload failed [${publicId}]: ${err.message}`);
    return null;
  }
};

// ─── PART IMAGE URLS ──────────────────────────────────────────────────────────
// picsum.photos/seed/<text> returns a deterministic image per seed string
const partImageUrl = (sku) =>
  `https://picsum.photos/seed/${sku.toLowerCase()}/800/600`;

// ─── PART LANDING-BLOCK TEMPLATES ────────────────────────────────────────────
const CATEGORY_DESC = {
  'bo-loc': (p) =>
    `${p.name} là sản phẩm lọc chất lượng cao từ thương hiệu ${p.brand || 'uy tín'}, giúp bảo vệ động cơ xe khỏi bụi bẩn, tạp chất và các hạt mài mòn. Được sản xuất đạt tiêu chuẩn OEM, sản phẩm đảm bảo hiệu suất lọc tối ưu và tuổi thọ dài lâu cho xe của bạn.`,
  'bugi-dien': (p) =>
    `${p.name} sử dụng công nghệ điện cực tiên tiến từ ${p.brand || 'hãng sản xuất hàng đầu'}, mang lại khả năng đánh lửa ổn định và hiệu quả đốt cháy tối ưu. Tương thích hoàn hảo với các dòng xe được chỉ định, giúp tiết kiệm nhiên liệu và tăng tuổi thọ động cơ.`,
  'he-thong-phanh': (p) =>
    `${p.name} là linh kiện hệ thống phanh cao cấp từ ${p.brand || 'nhà sản xuất chuyên nghiệp'}, được chế tác từ vật liệu chịu nhiệt và chịu mài mòn xuất sắc. Đảm bảo lực phanh mạnh mẽ, ổn định trong mọi điều kiện từ đô thị đến địa hình khắc nghiệt.`,
  'he-thong-lam-mat': (p) =>
    `${p.name} giúp duy trì nhiệt độ động cơ ở mức tối ưu, ngăn ngừa quá nhiệt và bảo vệ các bộ phận bên trong. Sản phẩm từ ${p.brand || 'thương hiệu uy tín'} đảm bảo hệ thống làm mát hoạt động hiệu quả trong mọi thời tiết.`,
  'lop-xe-banh-xe': (p) =>
    `${p.name} là lốp xe cao cấp từ ${p.brand || 'nhà sản xuất lốp hàng đầu'}, được thiết kế với hoa lốp đặc biệt mang lại độ bám đường xuất sắc trên cả đường khô và ướt. Compound rubber tiên tiến giúp tăng tuổi thọ lốp và giảm tiêu hao nhiên liệu.`,
  'ac-quy': (p) =>
    `${p.name} là ắc quy xe hơi cao cấp từ ${p.brand || 'hãng ắc quy uy tín'}, cung cấp năng lượng khởi động đáng tin cậy trong mọi điều kiện thời tiết. Thiết kế kín hoàn toàn, không cần bảo trì, tuổi thọ vượt trội lên đến 3–5 năm.`,
  'dau-dung-dich': (p) =>
    `${p.name} được pha chế từ dầu gốc tổng hợp toàn phần với các phụ gia tiên tiến của ${p.brand || 'thương hiệu dầu nhớt hàng đầu'}. Bảo vệ động cơ toàn diện từ lúc khởi động lạnh đến khi động cơ nóng, kéo dài tuổi thọ và cải thiện hiệu suất.`,
  'truyen-dong': (p) =>
    `${p.name} là linh kiện hệ thống truyền động chất lượng cao từ ${p.brand || 'nhà sản xuất chuyên nghiệp'}, được gia công chính xác để đảm bảo truyền công suất hiệu quả và êm ái. Vật liệu cao cấp giúp tăng độ bền và giảm tiếng ồn khi vận hành.`,
  'gat-mua-kinh': (p) =>
    `${p.name} là gạt mưa công nghệ mới từ ${p.brand || 'thương hiệu uy tín'}, thiết kế không khung (frameless) tiên tiến đảm bảo tiếp xúc đồng đều với kính, cho tầm nhìn rõ ràng trong mọi điều kiện mưa. Cao su đặc biệt chịu UV và nhiệt độ cực đoan.`,
  'he-thong-treo': (p) =>
    `${p.name} là giảm xóc/hệ thống treo chất lượng cao từ ${p.brand || 'nhà sản xuất chuyên nghiệp'}, mang lại trải nghiệm lái êm ái và ổn định. Thiết kế kỹ thuật cao cấp giúp kiểm soát xe chính xác trong mọi điều kiện đường từ đô thị đến địa hình xấu.`,
  'den-chieu-sang': (p) =>
    `${p.name} là bóng đèn xe hơi cao cấp từ ${p.brand || 'thương hiệu chiếu sáng hàng đầu'}, cung cấp ánh sáng mạnh mẽ và trắng sáng, cải thiện đáng kể tầm nhìn ban đêm. Tuổi thọ vượt trội so với bóng đèn tiêu chuẩn, tiết kiệm chi phí thay thế lâu dài.`,
};

const CATEGORY_FEATURES = {
  'bo-loc': () => [
    { title: 'Hiệu suất lọc cao', description: 'Loại bỏ hơn 99% tạp chất và hạt mài mòn, bảo vệ động cơ tối đa', icon: 'Shield' },
    { title: 'Lắp đặt dễ dàng', description: 'Tương thích OEM, không cần chỉnh sửa, thay thế nhanh chóng', icon: 'Wrench' },
    { title: 'Tuổi thọ dài', description: 'Thiết kế chịu nhiệt độ và áp suất cao, đảm bảo vận hành ổn định qua nhiều nghìn km', icon: 'Clock' },
  ],
  'bugi-dien': () => [
    { title: 'Đánh lửa ổn định', description: 'Điện cực Iridium/Platinum đảm bảo tia lửa đồng đều, tiết kiệm nhiên liệu tối đa', icon: 'Zap' },
    { title: 'Tuổi thọ vượt trội', description: 'Kéo dài tuổi thọ gấp 4–6 lần so với bugi thường, giảm chi phí bảo dưỡng', icon: 'Star' },
    { title: 'Tương thích OEM', description: 'Được kiểm định và khuyến nghị bởi các hãng xe hàng đầu thế giới', icon: 'CheckCircle' },
  ],
  'he-thong-phanh': () => [
    { title: 'Lực phanh mạnh', description: 'Vật liệu ma sát cao cấp đảm bảo phanh nhanh, an toàn trong mọi tình huống khẩn cấp', icon: 'AlertCircle' },
    { title: 'Chống nhiệt tốt', description: 'Chịu được nhiệt độ cao liên tục, không bị fade phanh khi phanh gắt liên tiếp', icon: 'Thermometer' },
    { title: 'Ít bụi phanh', description: 'Công thức đặc biệt giảm thiểu bụi phanh đen, bảo vệ mâm xe sạch đẹp lâu dài', icon: 'Wind' },
  ],
  'he-thong-lam-mat': () => [
    { title: 'Làm mát hiệu quả', description: 'Duy trì nhiệt độ động cơ ổn định ở mọi điều kiện vận hành từ thành phố đến cao tốc', icon: 'Thermometer' },
    { title: 'Chống đông & chống ăn mòn', description: 'Bảo vệ toàn bộ hệ thống làm mát khỏi rỉ sét, đóng cặn và đóng băng', icon: 'Shield' },
    { title: 'Lắp đặt tiêu chuẩn', description: 'Thiết kế OEM, thay thế nhanh chóng không cần dụng cụ đặc biệt', icon: 'Wrench' },
  ],
  'lop-xe-banh-xe': () => [
    { title: 'Bám đường xuất sắc', description: 'Hoa lốp tối ưu hóa diện tích tiếp xúc, bám đường tốt trên cả đường khô và ướt', icon: 'Shield' },
    { title: 'Thoát nước tốt', description: 'Rãnh thoát nước rộng ngăn ngừa hiệu ứng aquaplaning khi đường ướt', icon: 'Droplets' },
    { title: 'Tiết kiệm nhiên liệu', description: 'Compound rubber đặc biệt giảm lực cản lăn, tiết kiệm đến 5% nhiên liệu', icon: 'TrendingDown' },
  ],
  'ac-quy': () => [
    { title: 'Khởi động mạnh mẽ', description: 'Chỉ số CCA cao đảm bảo khởi động xe dễ dàng ngay cả khi trời lạnh dưới 0°C', icon: 'Zap' },
    { title: 'Tuổi thọ dài', description: 'Công nghệ tiên tiến kéo dài tuổi thọ ắc quy lên đến 3–5 năm sử dụng bình thường', icon: 'Clock' },
    { title: 'Không cần bảo trì', description: 'Thiết kế kín hoàn toàn, không cần châm thêm nước distilled, tiện lợi tuyệt đối', icon: 'CheckCircle' },
  ],
  'dau-dung-dich': () => [
    { title: 'Bảo vệ động cơ toàn diện', description: 'Màng dầu bền vững bảo vệ kim loại ngay từ giây đầu tiên khởi động lạnh', icon: 'Shield' },
    { title: 'Tăng hiệu suất động cơ', description: 'Giảm ma sát nội tại, giải phóng thêm công suất và cải thiện phản hồi ga', icon: 'TrendingUp' },
    { title: 'Chu kỳ thay dài hơn', description: 'Dầu tổng hợp toàn phần giữ được tính năng lâu hơn 2–3 lần so với dầu khoáng', icon: 'Clock' },
  ],
  'truyen-dong': () => [
    { title: 'Truyền lực hiệu quả', description: 'Thiết kế chính xác đảm bảo truyền toàn bộ công suất động cơ đến bánh xe', icon: 'Zap' },
    { title: 'Độ bền cao', description: 'Vật liệu thép hợp kim cao cấp đảm bảo độ bền trong điều kiện vận hành khắc nghiệt', icon: 'Shield' },
    { title: 'Vận hành êm ái', description: 'Thiết kế giảm rung và tiếng ồn, tạo cảm giác lái mượt mà, không giật', icon: 'Activity' },
  ],
  'gat-mua-kinh': () => [
    { title: 'Tầm nhìn rõ ràng', description: 'Lưỡi gạt tiếp xúc đồng đều toàn bộ bề mặt kính, không để lại vệt hoặc dải nước', icon: 'Eye' },
    { title: 'Chịu thời tiết khắc nghiệt', description: 'Cao su đặc biệt chịu được tia UV, nhiệt độ cao và giá lạnh mà không bị cứng', icon: 'Sun' },
    { title: 'Lắp đặt nhanh', description: 'Thiết kế click-on tiêu chuẩn, thay thế trong vài phút không cần dụng cụ', icon: 'Wrench' },
  ],
  'he-thong-treo': () => [
    { title: 'Kiểm soát xe chính xác', description: 'Tối ưu hóa độ ổn định và phản hồi lái trong mọi điều kiện đường xá', icon: 'Navigation' },
    { title: 'Hành trình êm ái hơn', description: 'Hấp thụ chấn động hiệu quả, giảm mệt mỏi cho lái xe và hành khách', icon: 'Activity' },
    { title: 'Tuổi thọ cao', description: 'Vật liệu cao cấp và thiết kế kỹ lưỡng đảm bảo vận hành lâu dài, bền bỉ', icon: 'Clock' },
  ],
  'den-chieu-sang': () => [
    { title: 'Ánh sáng trắng mạnh', description: 'Cung cấp ánh sáng gần giống ánh sáng ban ngày, cải thiện tầm nhìn an toàn', icon: 'Sun' },
    { title: 'Tuổi thọ vượt trội', description: 'Kéo dài tuổi thọ gấp 2–4 lần so với bóng đèn halogen tiêu chuẩn', icon: 'Clock' },
    { title: 'Lắp đặt OEM', description: 'Kích thước và đầu cắm tiêu chuẩn, thay thế trực tiếp không cần chỉnh sửa', icon: 'CheckCircle' },
  ],
};

function buildPartLandingBlocks(part) {
  const cat = part.category;
  const descFn = CATEGORY_DESC[cat] || ((p) => `${p.name} – sản phẩm chất lượng cao từ ${p.brand || 'thương hiệu uy tín'}, đáp ứng tiêu chuẩn OEM và mang lại hiệu suất ổn định lâu dài.`);
  const featFn = CATEGORY_FEATURES[cat] || (() => [
    { title: 'Chất lượng OEM', description: 'Đạt tiêu chuẩn nhà sản xuất xe, tương thích hoàn hảo', icon: 'Star' },
    { title: 'Bảo hành chính hãng', description: 'Đầy đủ tem bảo hành và hóa đơn VAT', icon: 'Shield' },
    { title: 'Giao hàng toàn quốc', description: 'Giao hàng nhanh trong 1–3 ngày làm việc', icon: 'Truck' },
  ]);
  return [
    { type: 'text',  title: 'Giới thiệu sản phẩm', content: descFn(part) },
    { type: 'feature_grid', title: 'Ưu điểm nổi bật', subtitle: 'Lý do lựa chọn sản phẩm này', features: featFn(part) },
  ];
}

// ─── BRAND LOGO URLS ─────────────────────────────────────────────────────────
// Using Clearbit Logo API (128x128 PNG, free tier)
const BRAND_LOGO_URLS = {
  'Toyota':         'https://logo.clearbit.com/toyota.com',
  'Honda':          'https://logo.clearbit.com/honda.com',
  'Hyundai':        'https://logo.clearbit.com/hyundai.com',
  'Kia':            'https://logo.clearbit.com/kia.com',
  'BMW':            'https://logo.clearbit.com/bmw.com',
  'Mercedes-Benz':  'https://logo.clearbit.com/mercedes-benz.com',
  'Audi':           'https://logo.clearbit.com/audi.com',
  'Ford':           'https://logo.clearbit.com/ford.com',
  'Mazda':          'https://logo.clearbit.com/mazda.com',
  'Mitsubishi':     'https://logo.clearbit.com/mitsubishi.com',
  'Volkswagen':     'https://logo.clearbit.com/volkswagen.com',
  'Lexus':          'https://logo.clearbit.com/lexus.com',
  'Subaru':         'https://logo.clearbit.com/subaru.com',
  'Peugeot':        'https://logo.clearbit.com/peugeot.com',
  'Volvo':          'https://logo.clearbit.com/volvocars.com',
};

// ─── CARS DATA ────────────────────────────────────────────────────────────────
const CARS_DATA = [
  // ── TOYOTA ──────────────────────────────────────────────────────────────────
  {
    brandName: 'Toyota', name: 'Toyota Camry 2.5Q', slug: 'toyota-camry-25q-2024',
    sku: 'CAR-TOY-CAM-001', bodyStyle: 'Sedan', year: 2024, price: 1_495_000_000,
    tagline: 'Đẳng cấp sedan hàng đầu – Sang trọng đích thực',
    description: 'Toyota Camry 2.5Q 2024 là phiên bản cao cấp nhất của dòng sedan biểu tượng, được trang bị động cơ 2.5L DOHC mạnh mẽ cùng vô số tính năng tiện nghi và an toàn đỉnh cao.',
    engine: '2.5L 4-xylanh DOHC VVT-iE', power: '218 HP / 221 Nm', fuel: 'Xăng', seats: 5,
    versions: ['2.5Q', '2.5HV', '2.0G', '2.0E'], isFeatured: true,
    colors: [
      { name: 'Trắng Ngọc Trai', value: '#F2EFE9' },
      { name: 'Đen Mica', value: '#1A1A1A' },
      { name: 'Xám Bạc', value: '#8C8C8C' },
      { name: 'Đỏ Crimson', value: '#9B1C1C' },
    ],
    features: [
      { title: 'Màn hình giải trí 12.3"', desc: 'Hệ thống giải trí thế hệ mới với màn hình cảm ứng lớn, tích hợp Apple CarPlay và Android Auto không dây.' },
      { title: 'Toyota Safety Sense 3.0', desc: 'Hệ thống hỗ trợ lái tiên tiến bao gồm phanh khẩn cấp tự động, cảnh báo lệch làn, giữ làn tự động.' },
      { title: 'Âm thanh JBL 9 loa', desc: 'Trải nghiệm âm thanh vòm sống động với hệ thống 9 loa JBL cao cấp, khuếch đại 800W.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Loại động cơ', value: '4-xylanh DOHC VVT-iE' },
        { label: 'Dung tích', value: '2.487 cc (2.5L)' },
        { label: 'Công suất tối đa', value: '218 HP @ 6.600 rpm' },
        { label: 'Mô-men xoắn', value: '221 Nm @ 5.200 rpm' },
        { label: 'Hộp số', value: 'Tự động 8 cấp Direct Shift' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.910 × 1.840 × 1.445 mm' },
        { label: 'Chiều dài cơ sở', value: '2.825 mm' },
        { label: 'Trọng lượng không tải', value: '1.560 kg' },
        { label: 'Dung tích bình xăng', value: '60 lít' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '8.3 giây' },
        { label: 'Tốc độ tối đa', value: '180 km/h' },
        { label: 'Tiêu thụ nhiên liệu', value: '7.8 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '9 túi khí toàn diện' },
        { label: 'Phanh', value: 'Đĩa thông gió 4 bánh + ABS/EBD/BA' },
        { label: 'Hỗ trợ chủ động', value: 'Toyota Safety Sense 3.0 (PCS, LDA, LTA, RCTAB)' },
        { label: 'Camera', value: 'Camera 360° + cảm biến đỗ xe' },
      ]},
    ],
  },
  {
    brandName: 'Toyota', name: 'Toyota Fortuner 2.8 Legender', slug: 'toyota-fortuner-28-legender-2024',
    sku: 'CAR-TOY-FOR-002', bodyStyle: 'SUV', year: 2024, price: 1_456_000_000,
    tagline: 'SUV bất khuất – Chinh phục mọi địa hình',
    description: 'Toyota Fortuner 2.8 Legender là đỉnh cao của dòng SUV 7 chỗ, kết hợp hoàn hảo giữa khả năng off-road cứng cáp và nội thất sang trọng đẳng cấp.',
    engine: '2.8L 4-xylanh Diesel Turbocharged', power: '204 HP / 500 Nm', fuel: 'Diesel', seats: 7,
    versions: ['2.8 Legender 4x4 AT', '2.8 AT 4x4', '2.4 AT 4x4', '2.4 AT 4x2'],
    isFeatured: true,
    colors: [
      { name: 'Trắng Ngọc Trai', value: '#F2EFE9' },
      { name: 'Bạc Titan', value: '#9E9E9E' },
      { name: 'Đen Mica', value: '#1A1A1A' },
      { name: 'Nâu Đồng', value: '#7D5A3C' },
    ],
    features: [
      { title: 'Khung xe thân trên & khung gầm độc lập', desc: 'Cấu trúc khung gầm liền khối (Body-on-Frame) cứng cáp, vượt địa hình xuất sắc.' },
      { title: 'Hệ thống 4WD thông minh', desc: 'Hệ thống dẫn động 4 bánh với khóa vi sai trung tâm, Crawl Control hỗ trợ leo đồi.' },
      { title: 'Nội thất Legender', desc: 'Ghế da cao cấp, ghế lái chỉnh điện 8 hướng, màn hình 9" với Apple CarPlay.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Loại động cơ', value: 'Diesel 4-xylanh 2GD-FTV Turbo' },
        { label: 'Dung tích', value: '2.755 cc (2.8L)' },
        { label: 'Công suất tối đa', value: '204 HP @ 3.400 rpm' },
        { label: 'Mô-men xoắn', value: '500 Nm @ 1.600–2.800 rpm' },
        { label: 'Hộp số', value: 'Tự động 6 cấp' },
        { label: 'Dẫn động', value: '4WD Part-time (H4, H2, L4)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.795 × 1.855 × 1.835 mm' },
        { label: 'Chiều dài cơ sở', value: '2.745 mm' },
        { label: 'Khoảng sáng gầm', value: '279 mm' },
        { label: 'Trọng lượng không tải', value: '2.055 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '10.1 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '9.1 L/100km (kết hợp)' },
        { label: 'Góc lội nước tối đa', value: '700 mm' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '7 túi khí (lái, phụ, bên hông, rèm)' },
        { label: 'Hỗ trợ chủ động', value: 'Toyota Safety Sense (PCS, LDA)' },
        { label: 'Hỗ trợ địa hình', value: 'Crawl Control, Downhill Assist Control, A-TRC' },
      ]},
    ],
  },

  // ── HONDA ────────────────────────────────────────────────────────────────────
  {
    brandName: 'Honda', name: 'Honda Civic RS', slug: 'honda-civic-rs-2024',
    sku: 'CAR-HON-CIV-001', bodyStyle: 'Sedan', year: 2024, price: 870_000_000,
    tagline: 'Thể thao đích thực – Khác biệt hoàn toàn',
    description: 'Honda Civic RS 2024 mang phong cách thể thao táo bạo với động cơ Turbo 1.5L mạnh mẽ và hệ thống an toàn Honda SENSING tiên tiến.',
    engine: '1.5L VTEC Turbo DOHC', power: '182 HP / 240 Nm', fuel: 'Xăng', seats: 5,
    versions: ['RS', 'E', 'G'],
    isFeatured: true,
    colors: [
      { name: 'Đỏ Rallye', value: '#C41E3A' },
      { name: 'Trắng Bạch Kim', value: '#F0F0F0' },
      { name: 'Đen Tinh Tú', value: '#1A1A1A' },
      { name: 'Xanh Sonic', value: '#1E4E8C' },
    ],
    features: [
      { title: 'Động cơ VTEC Turbo 1.5L', desc: 'Công nghệ Turbo Charged kết hợp VTEC cho hiệu suất cao và tiết kiệm nhiên liệu vượt trội.' },
      { title: 'Honda SENSING', desc: 'Bộ công nghệ an toàn chủ động gồm CMBS, LKA, ACC, RDM bảo vệ toàn diện mọi hành trình.' },
      { title: 'Màn hình cảm ứng 9"', desc: 'Hệ thống giải trí Honda Connect với Apple CarPlay/Android Auto không dây, âm thanh 12 loa Bose.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Loại động cơ', value: 'VTEC Turbo DOHC 1.5L' },
        { label: 'Công suất tối đa', value: '182 HP @ 6.000 rpm' },
        { label: 'Mô-men xoắn', value: '240 Nm @ 1.700–4.500 rpm' },
        { label: 'Hộp số', value: 'CVT 7 cấp giả lập' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.674 × 1.802 × 1.415 mm' },
        { label: 'Chiều dài cơ sở', value: '2.735 mm' },
        { label: 'Trọng lượng không tải', value: '1.332 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '7.9 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '6.7 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Honda SENSING', value: 'CMBS, LKA, RDM, ACC, LSF' },
        { label: 'Phanh', value: 'Đĩa 4 bánh + ABS/EBD/VSA' },
      ]},
    ],
  },
  {
    brandName: 'Honda', name: 'Honda CR-V L', slug: 'honda-crv-l-2024',
    sku: 'CAR-HON-CRV-002', bodyStyle: 'SUV', year: 2024, price: 1_189_000_000,
    tagline: 'SUV gia đình lý tưởng – Rộng rãi, thông minh, an toàn',
    description: 'Honda CR-V L 2024 là phiên bản cao cấp nhất của dòng SUV bán chạy nhất Việt Nam, với động cơ Turbo mạnh mẽ và không gian cabin thực dụng cho gia đình.',
    engine: '1.5L VTEC Turbo DOHC', power: '190 HP / 243 Nm', fuel: 'Xăng', seats: 5,
    versions: ['L', 'G', 'E'],
    colors: [
      { name: 'Trắng Bạch Kim', value: '#F0F0F0' },
      { name: 'Xanh Obsidian', value: '#1A2744' },
      { name: 'Bạc Lunar', value: '#A8A8A8' },
      { name: 'Đỏ Radiant', value: '#C41E3A' },
    ],
    features: [
      { title: 'Không gian rộng rãi', desc: 'Khoang hành lý 589L (có thể mở rộng 1.113L), tích hợp cốp điện tự động tay đón.' },
      { title: 'Honda SENSING thế hệ mới', desc: 'Hệ thống an toàn nâng cấp với Wide View Front Camera và Rear Cross Traffic Monitor.' },
      { title: 'Panoramic Sunroof', desc: 'Cửa sổ trời toàn cảnh 2 tầng mang ánh sáng tự nhiên tràn ngập không gian cabin.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'VTEC Turbo 1.5L DOHC' },
        { label: 'Công suất', value: '190 HP @ 5.600 rpm' },
        { label: 'Mô-men xoắn', value: '243 Nm @ 1.600–5.000 rpm' },
        { label: 'Hộp số', value: 'CVT Earth Dreams' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD) / Thực dụng AWD' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.694 × 1.866 × 1.679 mm' },
        { label: 'Chiều dài cơ sở', value: '2.700 mm' },
        { label: 'Khoang hành lý', value: '589 L (hàng ghế sau dựng)' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '8.5 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '7.4 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Honda SENSING', value: 'CMBS, LKA, ACC, LCF, RDM' },
        { label: 'Camera', value: 'Camera 360° + LaneWatch' },
      ]},
    ],
  },

  // ── HYUNDAI ──────────────────────────────────────────────────────────────────
  {
    brandName: 'Hyundai', name: 'Hyundai Tucson 2.0 Premium', slug: 'hyundai-tucson-20-premium-2024',
    sku: 'CAR-HYU-TUC-001', bodyStyle: 'SUV', year: 2024, price: 879_000_000,
    tagline: 'Thiết kế Parametric Jewel – Hiện đại không giới hạn',
    description: 'Hyundai Tucson 2024 gây ấn tượng mạnh với ngôn ngữ thiết kế Parametric Jewel độc đáo và bộ trang bị công nghệ hiện đại nhất phân khúc SUV C.',
    engine: '2.0L MPI Atkinson', power: '156 HP / 192 Nm', fuel: 'Xăng', seats: 5,
    versions: ['2.0 Premium', '2.0 Tiêu chuẩn', '1.6T Đặc biệt'],
    colors: [
      { name: 'Trắng Atlas', value: '#F0EEEA' },
      { name: 'Xanh Aqua Teal', value: '#2E7D81' },
      { name: 'Đen Phantom', value: '#1A1A1A' },
      { name: 'Đỏ Dragon Red', value: '#A8252A' },
    ],
    features: [
      { title: 'Thiết kế Parametric Jewel', desc: 'Ngoại thất nổi bật với các mảng kim loại hình học 3D độc đáo, không lẫn với bất kỳ xe nào.' },
      { title: 'Màn hình Panoramic 10.25"', desc: 'Cụm bảng đồng hồ kỹ thuật số 10.25" kết hợp màn hình giải trí 10.25" liền mạch.' },
      { title: 'Hyundai SmartSense', desc: 'Gói an toàn tiên tiến với FCA, LKA, DAW, HDA, BCA giúp lái xe an toàn, thư thái.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: '2.0L MPI Atkinson Cycle' },
        { label: 'Công suất', value: '156 HP @ 6.200 rpm' },
        { label: 'Mô-men xoắn', value: '192 Nm @ 5.000 rpm' },
        { label: 'Hộp số', value: 'Tự động 6 cấp' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.500 × 1.865 × 1.665 mm' },
        { label: 'Chiều dài cơ sở', value: '2.680 mm' },
        { label: 'Trọng lượng không tải', value: '1.560 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '10.6 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '7.7 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Hyundai SmartSense', value: 'FCA, LKA, DAW, HDA, RCCA, BCA' },
        { label: 'Camera', value: 'Camera lùi + cảm biến trước/sau' },
      ]},
    ],
  },
  {
    brandName: 'Hyundai', name: 'Hyundai Santa Fe 2.5 Premium', slug: 'hyundai-santa-fe-25-premium-2024',
    sku: 'CAR-HYU-SAN-002', bodyStyle: 'SUV', year: 2024, price: 1_375_000_000,
    tagline: 'SUV 7 chỗ cao cấp – Phong cách lãnh đạo',
    description: 'Hyundai Santa Fe 2024 hoàn toàn mới với thiết kế cứng cáp mạnh mẽ và cabin rộng rãi 7 chỗ sang trọng, là lựa chọn hoàn hảo cho gia đình hiện đại.',
    engine: '2.5L MPI', power: '194 HP / 246 Nm', fuel: 'Xăng', seats: 7,
    versions: ['2.5 Premium', '2.5 Đặc biệt', '2.5 Tiêu chuẩn'],
    colors: [
      { name: 'Trắng Ceramic', value: '#EDEAE4' },
      { name: 'Xanh Denim', value: '#2C4A6E' },
      { name: 'Đen Phantom', value: '#1A1A1A' },
      { name: 'Đồng Titan', value: '#7A6A54' },
    ],
    features: [
      { title: 'Thiết kế hoàn toàn mới 2024', desc: 'Ngôn ngữ thiết kế Bold & Progressive với đèn chữ H độc đáo, cản trước mạnh mẽ.' },
      { title: 'Cabin 7 chỗ sang trọng', desc: 'Ghế hàng 1&2 chỉnh điện, sưởi/thông gió, ghế hàng 3 thoải mái với không gian rộng.' },
      { title: 'Hệ thống giải trí đỉnh cao', desc: 'Màn hình Panoramic 12.3", âm thanh Bose 12 loa, tích hợp OTA update.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'Xăng 2.5L MPI Smartstream' },
        { label: 'Công suất', value: '194 HP @ 6.100 rpm' },
        { label: 'Mô-men xoắn', value: '246 Nm @ 4.000 rpm' },
        { label: 'Hộp số', value: 'Tự động 8 cấp' },
        { label: 'Dẫn động', value: 'AWD (HTRAC)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.830 × 1.900 × 1.720 mm' },
        { label: 'Chiều dài cơ sở', value: '2.815 mm' },
        { label: 'Trọng lượng không tải', value: '1.950 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '9.8 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '9.1 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '8 túi khí' },
        { label: 'Hyundai SmartSense', value: 'FCA, LKA, HDA 2, BCA, RCCA, DAW' },
        { label: 'Camera', value: 'Camera 360° Surround View' },
      ]},
    ],
  },

  // ── KIA ──────────────────────────────────────────────────────────────────────
  {
    brandName: 'Kia', name: 'Kia K3 1.6 Luxury', slug: 'kia-k3-16-luxury-2024',
    sku: 'CAR-KIA-K3-001', bodyStyle: 'Sedan', year: 2024, price: 699_000_000,
    tagline: 'Sedan thể thao – Trẻ trung, năng động',
    description: 'Kia K3 2024 với thiết kế Opposites United cuốn hút, kết hợp công nghệ hiện đại và trang bị an toàn SmartSense ấn tượng cho phân khúc sedan hạng C.',
    engine: '1.6L MPI DOHC', power: '123 HP / 153 Nm', fuel: 'Xăng', seats: 5,
    versions: ['1.6 Luxury', '1.6 Premium', '1.6 Tiêu chuẩn'],
    colors: [
      { name: 'Trắng Snow', value: '#F2F0EC' },
      { name: 'Đỏ Aurora', value: '#C12127' },
      { name: 'Xám Steel', value: '#6E7375' },
      { name: 'Đen Aurora', value: '#1A1A1A' },
    ],
    features: [
      { title: 'Thiết kế Opposites United', desc: 'Ngoại thất ấn tượng với lưới tản nhiệt Tiger Nose cải tiến và đèn LED DRL hiện đại.' },
      { title: 'Màn hình cảm ứng 10.25"', desc: 'Hệ thống giải trí Kia Connect với Apple CarPlay/Android Auto, điều hướng trực tuyến.' },
      { title: 'Kia SmartSense', desc: 'Gói an toàn FCA, LKA, DAW, BCW giúp lái xe tự tin và an toàn mọi lúc.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'MPI 1.6L DOHC' },
        { label: 'Công suất', value: '123 HP @ 6.300 rpm' },
        { label: 'Mô-men xoắn', value: '153 Nm @ 4.000 rpm' },
        { label: 'Hộp số', value: 'Tự động 6 cấp IVT' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD)' },
      ]},
      { category: 'Kích thước', items: [
        { label: 'Dài × Rộng × Cao', value: '4.640 × 1.800 × 1.450 mm' },
        { label: 'Chiều dài cơ sở', value: '2.700 mm' },
        { label: 'Dung tích khoang hành lý', value: '502 lít' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tiêu thụ nhiên liệu', value: '6.8 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Kia SmartSense', value: 'FCA, LKA, DAW, BCW, RCCW' },
      ]},
    ],
  },
  {
    brandName: 'Kia', name: 'Kia Sportage 1.6T Luxury', slug: 'kia-sportage-16t-luxury-2024',
    sku: 'CAR-KIA-SPO-002', bodyStyle: 'SUV', year: 2024, price: 919_000_000,
    tagline: 'Đẳng cấp SUV Hàn Quốc – Táo bạo và thông minh',
    description: 'Kia Sportage 2024 thế hệ thứ 5 gây ấn tượng với thiết kế tương phản nội – ngoại thất sáng tạo và bộ trang bị công nghệ đầy ắp trong phân khúc SUV C.',
    engine: '1.6L Turbo T-GDi', power: '177 HP / 265 Nm', fuel: 'Xăng', seats: 5,
    versions: ['1.6T Luxury', '1.6T Premium', '2.0 Tiêu chuẩn'],
    isFeatured: true,
    colors: [
      { name: 'Trắng Snow', value: '#F2F0EC' },
      { name: 'Xanh Yacht Blue', value: '#1E4E8C' },
      { name: 'Đen Aurora', value: '#1A1A1A' },
      { name: 'Đỏ Festive', value: '#C12127' },
    ],
    features: [
      { title: 'Thiết kế Contrastedual', desc: 'Khoang hành khách nổi bật với cụm đồng hồ lập thể 12.3" tích hợp và điều khiển viên đá cuội.' },
      { title: 'Động cơ Turbo 1.6L mạnh mẽ', desc: '177 HP kết hợp hộp số DCT 7 cấp cho phản ứng ga tức thì và tiết kiệm nhiên liệu.' },
      { title: 'Panoramic Curved Display', desc: 'Màn hình cong kép 12.3" liền mạch – bảng đồng hồ + giải trí – sang trọng như xe hạng sang.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'T-GDi 1.6L Turbo' },
        { label: 'Công suất', value: '177 HP @ 5.500 rpm' },
        { label: 'Mô-men xoắn', value: '265 Nm @ 1.500–4.500 rpm' },
        { label: 'Hộp số', value: 'DCT 7 cấp' },
        { label: 'Dẫn động', value: 'AWD thông minh (iAWD)' },
      ]},
      { category: 'Kích thước', items: [
        { label: 'Dài × Rộng × Cao', value: '4.515 × 1.865 × 1.645 mm' },
        { label: 'Chiều dài cơ sở', value: '2.680 mm' },
        { label: 'Khoảng sáng gầm', value: '181 mm' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '8.5 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '8.2 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Kia SmartSense', value: 'FCA, LKA, HDA, DAW, BCA, RCCA' },
        { label: 'Camera', value: 'Camera 360° + cảm biến đỗ xe' },
      ]},
    ],
  },

  // ── BMW ──────────────────────────────────────────────────────────────────────
  {
    brandName: 'BMW', name: 'BMW 320i M Sport', slug: 'bmw-320i-m-sport-2024',
    sku: 'CAR-BMW-320-001', bodyStyle: 'Sedan', year: 2024, price: 1_979_000_000,
    tagline: 'The Ultimate Driving Machine – Niềm vui lái thuần khiết',
    description: 'BMW 320i M Sport 2024 kết hợp hoàn hảo giữa thiết kế sang trọng, động cơ TwinPower Turbo mạnh mẽ và gói M Sport thể thao với nhiều công nghệ tiên tiến hàng đầu.',
    engine: '2.0L TwinPower Turbo', power: '184 HP / 300 Nm', fuel: 'Xăng', seats: 5,
    versions: ['320i M Sport', '320i Sport Line', '320i Gran Turismo'],
    isFeatured: true,
    colors: [
      { name: 'Mineral White', value: '#F0EDE8' },
      { name: 'Sapphire Black', value: '#1A1A2E' },
      { name: 'Melbourne Red', value: '#9B1C2E' },
      { name: 'Mineral Grey', value: '#8A8A8A' },
    ],
    features: [
      { title: 'Gói M Sport', desc: 'Bodykit M Sport, la-zăng M 18" song song, vô lăng M Sport da Alcantara, tay số M.' },
      { title: 'BMW Live Cockpit Plus', desc: 'Cụm đồng hồ 12.3" và màn hình cảm ứng 10.25" với iDrive 7.0 điều khiển cử chỉ.' },
      { title: 'Hệ thống lái BMW xDrive', desc: 'Công nghệ dẫn động thông minh giúp phân bổ lực kéo tối ưu, cảm giác lái thể thao.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: '4-xylanh TwinPower Turbo 2.0L' },
        { label: 'Công suất', value: '184 HP @ 5.000 rpm' },
        { label: 'Mô-men xoắn', value: '300 Nm @ 1.350–4.000 rpm' },
        { label: 'Hộp số', value: 'Steptronic 8 cấp' },
        { label: 'Dẫn động', value: 'Cầu sau (RWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.709 × 1.827 × 1.435 mm' },
        { label: 'Chiều dài cơ sở', value: '2.851 mm' },
        { label: 'Trọng lượng không tải', value: '1.470 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '7.1 giây' },
        { label: 'Tốc độ tối đa (giới hạn)', value: '235 km/h' },
        { label: 'Tiêu thụ nhiên liệu', value: '6.5 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Hỗ trợ chủ động', value: 'AEB, LCA, LDW, Rear Cross Traffic Alert' },
        { label: 'Camera', value: 'Camera lùi + Park Assist' },
      ]},
    ],
  },
  {
    brandName: 'BMW', name: 'BMW X5 xDrive40i M Sport', slug: 'bmw-x5-xdrive40i-m-sport-2024',
    sku: 'CAR-BMW-X5-002', bodyStyle: 'SUV', year: 2024, price: 4_498_000_000,
    tagline: 'SUV hạng sang đỉnh cao – Mạnh mẽ không giới hạn',
    description: 'BMW X5 xDrive40i M Sport 2024 là biểu tượng SUV hạng sang với không gian nội thất xa hoa, công nghệ đỉnh cao và khả năng vận hành đẳng cấp.',
    engine: '3.0L TwinPower Turbo 6-xylanh', power: '340 HP / 450 Nm', fuel: 'Xăng', seats: 7,
    versions: ['xDrive40i M Sport', 'xDrive40i Sport Line', 'xDrive30d M Sport'],
    isFeatured: true,
    colors: [
      { name: 'Alpine White', value: '#F5F5F5' },
      { name: 'Carbon Black', value: '#1A1A1A' },
      { name: 'Phytonic Blue', value: '#2A4A8C' },
      { name: 'Skyscraper Grey', value: '#6A6A6A' },
    ],
    features: [
      { title: 'Hệ thống xDrive thông minh', desc: 'Dẫn động 4 bánh toàn thời gian thích ứng, phân bổ lực kéo linh hoạt theo điều kiện đường.' },
      { title: 'BMW Curved Display', desc: 'Màn hình cong 12.3" kép liên tục với iDrive 8.0, điều khiển bằng giọng nói và cử chỉ.' },
      { title: 'Adaptive Air Suspension', desc: 'Hệ thống giảm xóc khí nén thích ứng, tự động điều chỉnh chiều cao gầm theo chế độ lái.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'B58 6-xylanh TwinPower Turbo 3.0L' },
        { label: 'Công suất', value: '340 HP @ 5.500 rpm' },
        { label: 'Mô-men xoắn', value: '450 Nm @ 1.500–5.200 rpm' },
        { label: 'Hộp số', value: 'Steptronic Sport 8 cấp' },
        { label: 'Dẫn động', value: 'xDrive 4WD toàn thời gian' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.922 × 2.004 × 1.745 mm' },
        { label: 'Chiều dài cơ sở', value: '2.975 mm' },
        { label: 'Khoang hành lý', value: '650 L (hàng 2 dựng)' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '5.5 giây' },
        { label: 'Tốc độ tối đa (giới hạn)', value: '250 km/h' },
        { label: 'Tiêu thụ nhiên liệu', value: '10.0 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '8 túi khí' },
        { label: 'BMW Driving Assistant Pro', value: 'LCA, RCTA, LKA, AEB với phát hiện người đi bộ' },
        { label: 'Camera', value: 'Camera 360° Surround View + Parking Assistant Plus' },
      ]},
    ],
  },
];

// ── MERCEDES-BENZ, AUDI, FORD, MAZDA, MITSUBISHI, các thương hiệu còn lại ────
const MORE_CARS = [
  {
    brandName: 'Mercedes-Benz', name: 'Mercedes-Benz C200 Avantgarde', slug: 'mercedes-benz-c200-avantgarde-2024',
    sku: 'CAR-MBZ-C200-001', bodyStyle: 'Sedan', year: 2024, price: 1_859_000_000,
    tagline: 'Das Beste oder nichts – Xe tốt nhất hoặc không gì cả',
    description: 'Mercedes-Benz C200 2024 W206 thế hệ mới với thiết kế tinh tế, cabin xa hoa và công nghệ MBUX thế hệ tiếp theo.',
    engine: '1.5L EQ Boost M254 Turbo + Mild-Hybrid', power: '204 HP / 300 Nm', fuel: 'Xăng', seats: 5,
    versions: ['C200 Avantgarde', 'C200 AMG Line', 'C300 AMG'], isFeatured: true,
    colors: [
      { name: 'Polar White', value: '#F5F5F5' }, { name: 'Obsidian Black', value: '#1A1A1A' },
      { name: 'Spectral Blue', value: '#1E3A5F' }, { name: 'High-Tech Silver', value: '#B0B0B0' },
    ],
    features: [
      { title: 'MBUX Superscreen 11.9"', desc: 'Màn hình cảm ứng nằm dọc cùng bảng đồng hồ 12.3", điều khiển bằng giọng nói "Hey Mercedes".' },
      { title: 'Agility Control Suspension', desc: 'Giảm xóc thích ứng tự điều chỉnh theo điều kiện đường, êm như đệm khí.' },
      { title: 'EQ Boost 48V MHEV', desc: 'Hệ thống hybrid nhẹ 48V tăng tốc mượt mà và tiết kiệm đến 10% nhiên liệu.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'M254 1.5L Turbo + EQ Boost 48V' },
        { label: 'Công suất', value: '204 HP + 20 HP (EQ Boost)' },
        { label: 'Mô-men xoắn', value: '300 Nm + 200 Nm (EQ Boost)' },
        { label: 'Hộp số', value: '9G-Tronic 9 cấp' },
        { label: 'Dẫn động', value: 'Cầu sau (RWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.751 × 1.820 × 1.438 mm' },
        { label: 'Chiều dài cơ sở', value: '2.865 mm' },
        { label: 'Trọng lượng không tải', value: '1.505 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '7.3 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '6.8 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '9 túi khí' },
        { label: 'Driving Assistance', value: 'AEB, LKA, LCA, BLIS, BSA' },
        { label: 'Camera', value: 'Camera 360° + Active Parking Assist' },
      ]},
    ],
  },
  {
    brandName: 'Mercedes-Benz', name: 'Mercedes-Benz GLC 300 AMG', slug: 'mercedes-benz-glc300-amg-2024',
    sku: 'CAR-MBZ-GLC-002', bodyStyle: 'SUV', year: 2024, price: 2_999_000_000,
    tagline: 'SUV sang trọng – Phong cách AMG không thể nhầm lẫn',
    description: 'Mercedes-Benz GLC 300 AMG 2024 kết hợp thẩm mỹ AMG Line táo bạo với cabin sang trọng và động cơ 4MATIC mạnh mẽ.',
    engine: '2.0L M254 Turbo + Mild-Hybrid', power: '258 HP / 400 Nm', fuel: 'Xăng', seats: 5,
    versions: ['GLC 300 AMG 4MATIC', 'GLC 200 Avantgarde'], isFeatured: true,
    colors: [
      { name: 'Polar White', value: '#F5F5F5' }, { name: 'Obsidian Black', value: '#1A1A1A' },
      { name: 'Selenite Grey', value: '#8A8A8A' }, { name: 'Spectral Blue', value: '#1E3A5F' },
    ],
    features: [
      { title: 'AMG Line Exterior', desc: 'La-zăng AMG 20", ốp hầm gió AMG, khuếch tán AMG sau mang phong cách hiệu suất cao.' },
      { title: 'MBUX Generation 2', desc: 'Màn hình 11.9" tích hợp ChatGPT AI, điều khiển cử chỉ và giọng nói nâng cao.' },
      { title: 'E-Active Body Control', desc: 'Hệ thống treo chủ động điện, tự cân bằng khi vào cua, êm và ổn định vượt trội.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'M254 2.0L Turbo + 48V MHEV' },
        { label: 'Công suất', value: '258 HP @ 5.800 rpm' },
        { label: 'Mô-men xoắn', value: '400 Nm @ 1.800–4.000 rpm' },
        { label: 'Hộp số', value: '9G-Tronic 9 cấp' },
        { label: 'Dẫn động', value: '4MATIC AWD toàn thời gian' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.720 × 1.890 × 1.640 mm' },
        { label: 'Chiều dài cơ sở', value: '2.888 mm' },
        { label: 'Trọng lượng không tải', value: '1.870 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '6.0 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '8.2 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '9 túi khí' },
        { label: 'Driving Assistance Package', value: 'AEB, LKA, LCA, BSA, Active Speed Limit Assist' },
        { label: 'Camera', value: '360° Surround View + Active Parking Assist' },
      ]},
    ],
  },
  {
    brandName: 'Audi', name: 'Audi A4 35 TFSI', slug: 'audi-a4-35tfsi-2024',
    sku: 'CAR-AUD-A4-001', bodyStyle: 'Sedan', year: 2024, price: 1_900_000_000,
    tagline: 'Vorsprung durch Technik – Tiến bộ qua công nghệ',
    description: 'Audi A4 2024 sedan hạng sang với Virtual Cockpit xa hoa và động cơ TFSI tiết kiệm hiệu quả.',
    engine: '2.0L TFSI Turbo', power: '150 HP / 270 Nm', fuel: 'Xăng', seats: 5,
    versions: ['35 TFSI', '40 TFSI quattro', '45 TFSI S-Line'],
    colors: [
      { name: 'Glacier White', value: '#F0EDE8' }, { name: 'Mythos Black', value: '#1A1A1A' },
      { name: 'Firmament Blue', value: '#1E3A5F' }, { name: 'Daytona Grey', value: '#5A5A5A' },
    ],
    features: [
      { title: 'Audi Virtual Cockpit Plus 12.3"', desc: 'Bảng đồng hồ kỹ thuật số hoàn toàn tùy chỉnh, hiển thị bản đồ và thông tin xe chi tiết.' },
      { title: 'MMI Navigation Plus 10.1"', desc: 'Hệ thống giải trí với điều hướng trực tuyến, Apple CarPlay/Android Auto.' },
      { title: 'Bang & Olufsen 3D Sound', desc: '19 loa Premium 3D Sound 755W – như phòng hòa nhạc thu nhỏ.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'TFSI 2.0L 4-xylanh Turbo' },
        { label: 'Công suất', value: '150 HP @ 5.000 rpm' },
        { label: 'Mô-men xoắn', value: '270 Nm @ 1.500–3.500 rpm' },
        { label: 'Hộp số', value: 'S tronic 7 cấp DCT' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.762 × 1.847 × 1.427 mm' },
        { label: 'Chiều dài cơ sở', value: '2.820 mm' },
        { label: 'Trọng lượng không tải', value: '1.410 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '8.9 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '6.4 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '8 túi khí' },
        { label: 'Audi Pre Sense', value: 'AEB, LCA, ACC, LDA, BSM' },
      ]},
    ],
  },
  {
    brandName: 'Audi', name: 'Audi Q5 45 TFSI quattro', slug: 'audi-q5-45tfsi-quattro-2024',
    sku: 'CAR-AUD-Q5-002', bodyStyle: 'SUV', year: 2024, price: 2_600_000_000,
    tagline: 'SUV quattro – Dẫn động 4 bánh huyền thoại',
    description: 'Audi Q5 45 TFSI quattro 2024 là SUV hạng sang bán chạy nhất của Audi với hệ dẫn động quattro lừng danh.',
    engine: '2.0L TFSI Turbo', power: '265 HP / 370 Nm', fuel: 'Xăng', seats: 5,
    versions: ['45 TFSI quattro', '40 TDI quattro S-Line'], isFeatured: true,
    colors: [
      { name: 'Glacier White', value: '#F0EDE8' }, { name: 'Manhattan Grey', value: '#7A7A7A' },
      { name: 'Navarra Blue', value: '#1C3357' }, { name: 'Chronos Grey', value: '#5A5A60' },
    ],
    features: [
      { title: 'Audi quattro AWD', desc: 'Dẫn động 4 bánh toàn thời gian huyền thoại, phân bổ lực kéo thông minh theo thời gian thực.' },
      { title: 'Virtual Cockpit Plus 12.3"', desc: 'Bảng đồng hồ kỹ thuật số với 4 chế độ hiển thị tùy chỉnh.' },
      { title: 'Matrix LED Headlights', desc: '16 đơn vị LED riêng lẻ, tự động điều chỉnh chùm sáng tránh xe đối diện.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'TFSI 2.0L 4-xylanh Turbo' },
        { label: 'Công suất', value: '265 HP @ 5.000–6.500 rpm' },
        { label: 'Mô-men xoắn', value: '370 Nm @ 1.600–4.500 rpm' },
        { label: 'Hộp số', value: 'S tronic 7 cấp DCT' },
        { label: 'Dẫn động', value: 'quattro AWD toàn thời gian' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.680 × 1.893 × 1.659 mm' },
        { label: 'Chiều dài cơ sở', value: '2.820 mm' },
        { label: 'Khoang hành lý', value: '520 L' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '5.9 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '8.6 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '8 túi khí' },
        { label: 'Audi Pre Sense 360°', value: 'AEB, LKA, LCA, ACC, BSM, RCTA' },
        { label: 'Camera', value: 'Camera 360° + Parking System Plus' },
      ]},
    ],
  },
  {
    brandName: 'Ford', name: 'Ford Ranger Wildtrak 2.0 Bi-Turbo', slug: 'ford-ranger-wildtrak-biturbo-2024',
    sku: 'CAR-FOR-RAN-001', bodyStyle: 'Bán tải', year: 2024, price: 999_000_000,
    tagline: 'Built Ford Tough – Mạnh hơn, thông minh hơn',
    description: 'Ford Ranger Wildtrak 2024 thế hệ mới với thiết kế mạnh mẽ, khả năng tải trọng vượt trội và hệ thống ADAS Ford Co-Pilot360 thông minh.',
    engine: '2.0L EcoBlue Bi-Turbo Diesel', power: '210 HP / 500 Nm', fuel: 'Diesel', seats: 5,
    versions: ['Wildtrak 4x4 AT', 'XLT 4x4 AT', 'XLS 4x2 MT'], isFeatured: true,
    colors: [
      { name: 'Arctic White', value: '#F5F5F5' }, { name: 'Agate Black', value: '#1A1A1A' },
      { name: 'Cactus Grey', value: '#5A6A5A' }, { name: 'Race Red', value: '#C41E3A' },
    ],
    features: [
      { title: 'Tải trọng 1.000 kg – Kéo 3.500 kg', desc: 'Sức kéo rơ-moóc 3.500 kg, tải thùng 1.000 kg – vua bán tải Việt Nam.' },
      { title: 'Ford SYNC 4A 12"', desc: 'Màn hình 12" với SYNC 4A, OTA update, Apple CarPlay/Android Auto không dây.' },
      { title: 'Ford Co-Pilot360', desc: 'AEB, LKA, kiểm soát hành trình thích ứng, hỗ trợ vào cua, cảnh báo điểm mù.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'EcoBlue 2.0L Bi-Turbo Diesel' },
        { label: 'Công suất', value: '210 HP @ 3.750 rpm' },
        { label: 'Mô-men xoắn', value: '500 Nm @ 1.750–2.000 rpm' },
        { label: 'Hộp số', value: 'Tự động 10 cấp SelectShift' },
        { label: 'Dẫn động', value: '4WD On-Demand (2H/4H/4L)' },
      ]},
      { category: 'Kích thước & Tải trọng', items: [
        { label: 'Dài × Rộng × Cao', value: '5.362 × 1.918 × 1.873 mm' },
        { label: 'Chiều dài cơ sở', value: '3.270 mm' },
        { label: 'Tải trọng thùng', value: '1.000 kg' },
        { label: 'Sức kéo rơ-moóc', value: '3.500 kg' },
        { label: 'Góc lội nước', value: '850 mm' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '9.9 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '8.5 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Ford Co-Pilot360', value: 'AEB, LKA, LCA, ACC, BSM, RCTA' },
        { label: 'Camera', value: 'Camera 360° Ford + 8 cảm biến' },
      ]},
    ],
  },
  {
    brandName: 'Mazda', name: 'Mazda CX-5 2.5 Signature AWD', slug: 'mazda-cx5-25-signature-awd-2024',
    sku: 'CAR-MAZ-CX5-001', bodyStyle: 'SUV', year: 2024, price: 1_099_000_000,
    tagline: 'Jinba Ittai – Xe và người như một',
    description: 'Mazda CX-5 2.5 Signature 2024 đỉnh cao với nội thất Nappa Leather và âm thanh Bose 10 loa.',
    engine: '2.5L Skyactiv-G DOHC', power: '188 HP / 252 Nm', fuel: 'Xăng', seats: 5,
    versions: ['2.5 Signature AWD', '2.5 Premium', '2.0 Luxury'], isFeatured: true,
    colors: [
      { name: 'Soul Red Crystal', value: '#9E1B1B' }, { name: 'Polymetal Grey', value: '#696969' },
      { name: 'Snowflake White', value: '#F0EDE8' }, { name: 'Machine Grey', value: '#5A5A5A' },
    ],
    features: [
      { title: 'Nội thất Nappa Leather', desc: 'Ghế da Nappa cao cấp, sưởi và thông gió ghế trước, ghế lái chỉnh điện 8 hướng.' },
      { title: 'Bose Audio 10 loa', desc: 'Hệ thống Bose premium 10 loa SoundTrue 3D như phòng thu chuyên nghiệp.' },
      { title: 'Mazda i-Activsense', desc: 'MRCC, BSM, RCTA, LDA, AEB, HBC bảo vệ toàn diện mọi hành trình.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'Skyactiv-G 2.5L DOHC' },
        { label: 'Công suất', value: '188 HP @ 6.000 rpm' },
        { label: 'Mô-men xoắn', value: '252 Nm @ 4.000 rpm' },
        { label: 'Hộp số', value: 'Skyactiv-Drive 6 cấp AT' },
        { label: 'Dẫn động', value: 'i-Activ AWD thông minh' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.575 × 1.842 × 1.680 mm' },
        { label: 'Chiều dài cơ sở', value: '2.700 mm' },
        { label: 'Trọng lượng không tải', value: '1.695 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '8.7 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '8.1 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Mazda i-Activsense', value: 'MRCC, BSM, RCTA, LDA, AEB, HBC, DAA' },
        { label: 'Camera', value: '360° + cảm biến đỗ xe' },
      ]},
    ],
  },
  {
    brandName: 'Mazda', name: 'Mazda3 2.0 Premium', slug: 'mazda3-20-premium-2024',
    sku: 'CAR-MAZ-MA3-002', bodyStyle: 'Sedan', year: 2024, price: 739_000_000,
    tagline: 'Thiết kế KODO – Thẩm mỹ Nhật Bản thuần khiết',
    description: 'Mazda3 2024 với ngôn ngữ thiết kế KODO 2.0 trơn nhẵn như điêu khắc nghệ thuật.',
    engine: '2.0L Skyactiv-G DOHC', power: '155 HP / 213 Nm', fuel: 'Xăng', seats: 5,
    versions: ['2.0 Premium', '2.0 Luxury', '1.5 Luxury'],
    colors: [
      { name: 'Soul Red Crystal', value: '#9E1B1B' }, { name: 'Snowflake White', value: '#F0EDE8' },
      { name: 'Polymetal Grey', value: '#696969' }, { name: 'Deep Crystal Blue', value: '#1A3A5C' },
    ],
    features: [
      { title: 'Thiết kế KODO 2.0', desc: 'Hình thức trơn nhẵn, không đường gờ, ấn tượng như tác phẩm điêu khắc.' },
      { title: 'Cabin yên tĩnh', desc: 'Vật liệu cách âm cao cấp, kính 4mm – yên tĩnh như xe hạng sang.' },
      { title: 'Mazda Connect 8.8"', desc: 'Điều khiển qua Commander knob, Apple CarPlay/Android Auto.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'Skyactiv-G 2.0L DOHC' },
        { label: 'Công suất', value: '155 HP @ 6.000 rpm' },
        { label: 'Mô-men xoắn', value: '213 Nm @ 4.000 rpm' },
        { label: 'Hộp số', value: 'Skyactiv-Drive 6 cấp AT' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.662 × 1.797 × 1.440 mm' },
        { label: 'Chiều dài cơ sở', value: '2.726 mm' },
        { label: 'Trọng lượng không tải', value: '1.365 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '8.3 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '6.9 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Mazda i-Activsense', value: 'MRCC, BSM, RCTA, LDA, AEB, HBC' },
      ]},
    ],
  },
  {
    brandName: 'Mitsubishi', name: 'Mitsubishi Xpander Cross 1.5T', slug: 'mitsubishi-xpander-cross-15t-2024',
    sku: 'CAR-MIT-XPA-001', bodyStyle: 'MPV', year: 2024, price: 685_000_000,
    tagline: 'MPV đa dụng – Mạnh mẽ, rộng rãi, tiết kiệm',
    description: 'Mitsubishi Xpander Cross 2024 là MPV 7 chỗ đa dụng với gói off-road nhẹ và động cơ Turbo 1.5L tiết kiệm.',
    engine: '1.5L MIVEC Turbo', power: '150 HP / 250 Nm', fuel: 'Xăng', seats: 7,
    versions: ['1.5T Cross AT', '1.5 AT', '1.5 MT'],
    colors: [
      { name: 'Trắng Titan', value: '#F5F2EA' }, { name: 'Đen Jet', value: '#1A1A1A' },
      { name: 'Bạc Sterling', value: '#A8A8A8' }, { name: 'Đỏ Active', value: '#C12127' },
    ],
    features: [
      { title: '7 chỗ linh hoạt', desc: 'Hàng ghế 2 trượt + gập, hàng ghế 3 gập phẳng tạo khoang hành lý 1.840L.' },
      { title: 'Turbo 1.5L 150 HP', desc: '250 Nm phản hồi ga tức thì, mạnh mẽ kể cả khi tải đầy 7 người.' },
      { title: 'Gầm cao 225 mm', desc: 'Góc tiếp cận 21°, dễ dàng vượt đường xấu và ngập nước.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'MIVEC Turbo 1.5L DOHC' },
        { label: 'Công suất', value: '150 HP @ 5.500 rpm' },
        { label: 'Mô-men xoắn', value: '250 Nm @ 1.800–3.500 rpm' },
        { label: 'Hộp số', value: 'CVT Sportronic' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.595 × 1.750 × 1.780 mm' },
        { label: 'Chiều dài cơ sở', value: '2.775 mm' },
        { label: 'Khoảng sáng gầm', value: '225 mm' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tiêu thụ nhiên liệu', value: '7.8 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Hỗ trợ an toàn', value: 'FCM, LDW, AEB, BSW' },
      ]},
    ],
  },
  {
    brandName: 'Mitsubishi', name: 'Mitsubishi Outlander 2.5 Premium', slug: 'mitsubishi-outlander-25-premium-2024',
    sku: 'CAR-MIT-OUT-002', bodyStyle: 'SUV', year: 2024, price: 1_090_000_000,
    tagline: 'SUV 7 chỗ thế hệ mới – Rộng lớn, hiện đại',
    description: 'Mitsubishi Outlander 2024 thế hệ hoàn toàn mới, nền tảng chung Nissan Rogue, không gian 7 chỗ rộng rãi.',
    engine: '2.5L MIVEC SOHC', power: '181 HP / 245 Nm', fuel: 'Xăng', seats: 7,
    versions: ['2.5 Premium AWC', '2.5 Luxury AWC', '2.5 Standard'],
    colors: [
      { name: 'Trắng Diamond', value: '#F5F2EA' }, { name: 'Đen Jet', value: '#1A1A1A' },
      { name: 'Xám Graphite', value: '#5A5A5A' }, { name: 'Đỏ Mercury', value: '#A8252A' },
    ],
    features: [
      { title: 'S-AWC thông minh', desc: 'Super All-Wheel Control phân bổ lực kéo 4 bánh thông minh, tăng khả năng bám đường.' },
      { title: 'Ghế 3 hàng Premium', desc: 'Da cao cấp, ghế lái điện 8 hướng, sưởi ghế hàng 1&2, ghế hàng 3 rộng rãi.' },
      { title: 'Bose Audio 9 loa', desc: 'StageFront 3D Sound Technology – âm thanh vòm xuất sắc.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'MIVEC 2.5L SOHC' },
        { label: 'Công suất', value: '181 HP @ 6.000 rpm' },
        { label: 'Mô-men xoắn', value: '245 Nm @ 3.600 rpm' },
        { label: 'Hộp số', value: 'CVT Sportronic 8 cấp giả lập' },
        { label: 'Dẫn động', value: 'S-AWC 4WD thông minh' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.710 × 1.862 × 1.745 mm' },
        { label: 'Chiều dài cơ sở', value: '2.705 mm' },
        { label: 'Khoang hành lý (gập hàng 2&3)', value: '1.818 L' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tiêu thụ nhiên liệu', value: '9.5 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '7 túi khí' },
        { label: 'Mitsubishi Safety Shield', value: 'FCM, LDW, BSW, RCTA, LKA, ACC' },
        { label: 'Camera', value: 'Camera 360° Multi-View' },
      ]},
    ],
  },
  {
    brandName: 'Volkswagen', name: 'Volkswagen Tiguan Allspace 2.0 TSI', slug: 'volkswagen-tiguan-allspace-20-tsi-2024',
    sku: 'CAR-VWG-TIG-001', bodyStyle: 'SUV', year: 2024, price: 1_999_000_000,
    tagline: 'Das Auto – Kỹ thuật Đức đỉnh cao',
    description: 'VW Tiguan Allspace 2024 là SUV 7 chỗ kỹ thuật Đức đáng tin cậy với động cơ TSI Turbo mạnh mẽ.',
    engine: '2.0L TSI Turbo', power: '220 HP / 350 Nm', fuel: 'Xăng', seats: 7,
    versions: ['2.0 TSI 4MOTION', '1.4 TSI'],
    colors: [
      { name: 'Pure White', value: '#F5F5F5' }, { name: 'Deep Black Pearl', value: '#1A1A1A' },
      { name: 'Atlantic Blue', value: '#1C3357' }, { name: 'Pyrite Silver', value: '#8A8A8A' },
    ],
    features: [
      { title: '4MOTION AWD', desc: 'Dẫn động 4 bánh thông minh, cải thiện xử lý mọi điều kiện mặt đường.' },
      { title: 'Discover Pro 9.2"', desc: 'Giải trí 9.2", điều hướng, Apple CarPlay/Android Auto.' },
      { title: 'IQ.DRIVE – Travel Assist', desc: 'Bán tự lái cấp 2 với AEB, LCA, ACC, hỗ trợ lái cao tốc.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'EA888 TSI 2.0L Turbo' },
        { label: 'Công suất', value: '220 HP @ 4.400–6.000 rpm' },
        { label: 'Mô-men xoắn', value: '350 Nm @ 1.500–4.400 rpm' },
        { label: 'Hộp số', value: 'DSG 7 cấp ly hợp kép' },
        { label: 'Dẫn động', value: '4MOTION AWD' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.701 × 1.859 × 1.674 mm' },
        { label: 'Chiều dài cơ sở', value: '2.786 mm' },
        { label: 'Khoang hành lý', value: '760 L (7 chỗ gập)' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '6.5 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '8.5 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '8 túi khí' },
        { label: 'IQ.DRIVE', value: 'Travel Assist, AEB, LCA, ACC, BLIS, RCTA' },
      ]},
    ],
  },
  {
    brandName: 'Lexus', name: 'Lexus RX 350 F Sport', slug: 'lexus-rx350-f-sport-2024',
    sku: 'CAR-LEX-RX-001', bodyStyle: 'SUV', year: 2024, price: 4_200_000_000,
    tagline: 'Takumi Craftsmanship – Nghệ thuật thủ công Nhật Bản',
    description: 'Lexus RX 350 F Sport 2024 thế hệ thứ 5 hoàn toàn mới, định nghĩa lại SUV hạng sang với Spindle Body táo bạo.',
    engine: '2.4L TNGA Turbo', power: '278 HP / 430 Nm', fuel: 'Xăng', seats: 5,
    versions: ['RX 350 F Sport', 'RX 350 Luxury', 'RX 350h Luxury'], isFeatured: true,
    colors: [
      { name: 'Eminent White Pearl', value: '#F5F2EA' }, { name: 'Sonic Chrome', value: '#C8C8C8' },
      { name: 'Obsidian', value: '#1A1A1A' }, { name: 'Grecian Water', value: '#2E7D81' },
    ],
    features: [
      { title: 'Thiết kế Spindle Body', desc: 'Ngôn ngữ thiết kế Spindle Body mạnh mẽ và khí động học hoàn toàn mới.' },
      { title: 'Nội thất Takumi', desc: 'Gỗ Shimamoku thật, da Alcantara, ghế massage đẳng cấp hạng sang.' },
      { title: 'Mark Levinson 21 loa 1.800W', desc: 'Hệ thống âm thanh đỉnh cao Clari-Fi – như concert hall di động.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'TNGA 2.4L 4-xylanh Turbo' },
        { label: 'Công suất', value: '278 HP @ 6.000 rpm' },
        { label: 'Mô-men xoắn', value: '430 Nm @ 1.700–3.600 rpm' },
        { label: 'Hộp số', value: 'Direct Shift 8 cấp AT' },
        { label: 'Dẫn động', value: 'AWD VDIM thông minh' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.890 × 1.920 × 1.700 mm' },
        { label: 'Chiều dài cơ sở', value: '2.850 mm' },
        { label: 'Trọng lượng không tải', value: '1.965 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '6.6 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '10.1 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '10 túi khí' },
        { label: 'Lexus Safety System+ 3.0', value: 'PCS, LDA, LTA, AHB, RCTAB' },
        { label: 'Camera', value: '360° Panoramic View Monitor' },
      ]},
    ],
  },
  {
    brandName: 'Subaru', name: 'Subaru Forester e-Boxer', slug: 'subaru-forester-e-boxer-2024',
    sku: 'CAR-SUB-FOR-001', bodyStyle: 'SUV', year: 2024, price: 999_000_000,
    tagline: 'Symmetrical AWD – Dẫn động đối xứng tuyệt đối',
    description: 'Subaru Forester e-Boxer 2024 với AWD Symmetrical huyền thoại và EyeSight tiên tiến.',
    engine: '2.0L Boxer 4-xylanh + Motor điện', power: '150 HP + 17 HP', fuel: 'Xăng Hybrid nhẹ', seats: 5,
    versions: ['e-Boxer Premium', 'e-Boxer Touring', '2.0i-L EyeSight'],
    colors: [
      { name: 'Crystal White Pearl', value: '#F5F2EA' }, { name: 'Dark Blue Pearl', value: '#1C2D4A' },
      { name: 'Magnetite Grey', value: '#5A5A5A' }, { name: 'Venetian Red Pearl', value: '#9B1C2E' },
    ],
    features: [
      { title: 'Symmetrical AWD', desc: 'Dẫn động đối xứng tuyệt đối, phân bổ lực kéo hoàn hảo theo tỷ lệ 60:40.' },
      { title: 'EyeSight 4.0', desc: 'Camera stereo nhìn màu đôi, phát hiện người đi bộ và xe đạp chính xác hơn.' },
      { title: 'X-Mode địa hình', desc: 'Snow/Dirt và Deep Snow/Mud tối ưu lực kéo cho địa hình khó.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'Boxer 4-xylanh 2.0L + Motor điện 17 HP' },
        { label: 'Công suất', value: '150 HP + 17 HP (Motor)' },
        { label: 'Hộp số', value: 'Lineartronic CVT' },
        { label: 'Dẫn động', value: 'Symmetrical AWD toàn thời gian' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.625 × 1.815 × 1.730 mm' },
        { label: 'Chiều dài cơ sở', value: '2.670 mm' },
        { label: 'Khoảng sáng gầm', value: '220 mm' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tiêu thụ nhiên liệu (e-Boxer)', value: '6.7 L/100km (kết hợp)' },
        { label: 'Góc lội nước', value: '500 mm' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Subaru EyeSight 4.0', value: 'AEB, LDA, ACC, Pre-Collision Braking, LKA' },
        { label: 'Driver Monitoring', value: 'Phát hiện tài xế buồn ngủ / mất tập trung' },
      ]},
    ],
  },
  {
    brandName: 'Peugeot', name: 'Peugeot 3008 GT', slug: 'peugeot-3008-gt-2024',
    sku: 'CAR-PEU-300-001', bodyStyle: 'SUV', year: 2024, price: 1_399_000_000,
    tagline: 'Allure Française – Phong cách Pháp thanh lịch',
    description: 'Peugeot 3008 GT 2024 với i-Cockpit 3D độc đáo và khoang lái ôm sát người dùng theo phong cách Pháp.',
    engine: '1.6L PureTech Turbo', power: '180 HP / 250 Nm', fuel: 'Xăng', seats: 5,
    versions: ['GT', 'Allure Pack', 'Active Pack'], isFeatured: true,
    colors: [
      { name: 'Pearl White', value: '#F2EFEA' }, { name: 'Magnetic Blue', value: '#1A3A5C' },
      { name: 'Selenite Grey', value: '#7A7A7A' }, { name: 'Nera Black', value: '#1A1A1A' },
    ],
    features: [
      { title: 'Peugeot i-Cockpit 3D', desc: 'Bảng đồng hồ 3D holographic nhìn từ trên qua vô lăng nhỏ đặc trưng Peugeot.' },
      { title: 'ADAS Level 2', desc: 'Giữ làn, kiểm soát hành trình, nhận biển báo tốc độ – bán tự lái cấp 2.' },
      { title: 'Focal Premium Sound', desc: '6 loa Focal thiết kế đặc biệt cho không gian âm học cabin Peugeot 3008.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'PureTech 1.6L 4-xylanh Turbo' },
        { label: 'Công suất', value: '180 HP @ 5.500 rpm' },
        { label: 'Mô-men xoắn', value: '250 Nm @ 1.750 rpm' },
        { label: 'Hộp số', value: 'EAT8 – 8 cấp tự động' },
        { label: 'Dẫn động', value: 'Cầu trước (FWD)' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.447 × 1.917 × 1.624 mm' },
        { label: 'Chiều dài cơ sở', value: '2.675 mm' },
        { label: 'Khoang hành lý', value: '520 L' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '8.2 giây' },
        { label: 'Tiêu thụ nhiên liệu', value: '7.1 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '6 túi khí' },
        { label: 'Peugeot Drive Assist', value: 'AEB, LKA, ACC, Lane Centering, BSD, RCTA' },
        { label: 'Camera', value: 'Camera 360° Visiopark' },
      ]},
    ],
  },
  {
    brandName: 'Volvo', name: 'Volvo XC60 B5 R-Design', slug: 'volvo-xc60-b5-r-design-2024',
    sku: 'CAR-VOL-XC6-001', bodyStyle: 'SUV', year: 2024, price: 2_890_000_000,
    tagline: 'Swedish Luxury – An toàn là giá trị cốt lõi',
    description: 'Volvo XC60 B5 R-Design 2024 với hệ thống an toàn tiên tiến nhất và trải nghiệm lái MHEV tinh tế.',
    engine: '2.0L B5 Turbo + Mild-Hybrid 48V', power: '250 HP / 350 Nm', fuel: 'Xăng Mild-Hybrid', seats: 5,
    versions: ['B5 R-Design AWD', 'B5 Momentum', 'B6 Inscription'], isFeatured: true,
    colors: [
      { name: 'Crystal White Pearl', value: '#F5F2EA' }, { name: 'Onyx Black', value: '#1A1A1A' },
      { name: 'Fjord Blue', value: '#1E3A5F' }, { name: 'Thunder Grey', value: '#5A5A5A' },
    ],
    features: [
      { title: 'Volvo Safety Suite', desc: 'City Safety, Pilot Assist (bán tự lái), Oncoming Lane Mitigation – an toàn nhất phân khúc.' },
      { title: 'B5 Mild-Hybrid 48V', desc: 'Thu hồi năng lượng phanh, khởi động êm, tiết kiệm đến 15%.' },
      { title: 'Bowers & Wilkins 15 loa 1.400W', desc: 'Trải nghiệm concert hall giữa cabin, chuẩn audiophile.' },
    ],
    specs: [
      { category: 'Động cơ & Hộp số', items: [
        { label: 'Động cơ', value: 'B5 2.0L Turbo + 48V MHEV' },
        { label: 'Công suất', value: '250 HP @ 5.500 rpm' },
        { label: 'Mô-men xoắn', value: '350 Nm @ 1.800–4.800 rpm' },
        { label: 'Hộp số', value: 'Geartronic 8 cấp AT' },
        { label: 'Dẫn động', value: 'AWD on-demand thông minh' },
      ]},
      { category: 'Kích thước & Trọng lượng', items: [
        { label: 'Dài × Rộng × Cao', value: '4.708 × 1.902 × 1.658 mm' },
        { label: 'Chiều dài cơ sở', value: '2.865 mm' },
        { label: 'Trọng lượng không tải', value: '1.920 kg' },
      ]},
      { category: 'Hiệu suất', items: [
        { label: 'Tăng tốc 0–100 km/h', value: '6.8 giây' },
        { label: 'Tốc độ tối đa (giới hạn)', value: '180 km/h (chính sách an toàn Volvo)' },
        { label: 'Tiêu thụ nhiên liệu', value: '8.3 L/100km (kết hợp)' },
      ]},
      { category: 'An toàn', items: [
        { label: 'Túi khí', value: '9 túi khí + Inflatable Curtain' },
        { label: 'Volvo Safety Suite', value: 'City Safety, Pilot Assist, OLM, LDW, ACC, BLIS, CTA' },
        { label: 'Camera', value: '360° Surround View + Park Assist Pilot' },
      ]},
    ],
  },
];

const ALL_CARS = [...CARS_DATA, ...MORE_CARS];

// ─── SEED FUNCTIONS ───────────────────────────────────────────────────────────

async function seedPartImages() {
  console.log('\n── Part Images & Landing Blocks ──────────────────────');
  const parts = await Part.find({});
  console.log(`  Found ${parts.length} parts`);
  let updated = 0;

  for (const part of parts) {
    const needsImage = !part.images || part.images.length === 0;
    const needsBlocks = !part.landing_blocks || part.landing_blocks.length === 0;
    if (!needsImage && !needsBlocks) { console.log(`  ~ skip (complete): ${part.sku}`); continue; }

    const updateData = {};

    if (needsImage) {
      const imgUrl = partImageUrl(part.sku);
      const cloudUrl = await uploadFromUrl(imgUrl, part.sku.toLowerCase(), 'carshop/parts');
      if (cloudUrl) updateData.images = [cloudUrl];
    }

    if (needsBlocks) {
      updateData.landing_blocks = buildPartLandingBlocks(part);
    }

    if (Object.keys(updateData).length > 0) {
      await Part.findByIdAndUpdate(part._id, { $set: updateData });
      console.log(`  ✓ ${part.sku}`);
      updated++;
    }

    await sleep(300);
  }
  console.log(`  Done: ${updated} parts updated`);
}

async function seedBrandLogos() {
  console.log('\n── Car Brand Logos ───────────────────────────────────');
  const brands = await Brand.find({});

  for (const brand of brands) {
    if (brand.image && brand.image.startsWith('https://res.cloudinary.com')) {
      console.log(`  ~ skip (has logo): ${brand.name}`);
      continue;
    }
    const logoUrl = BRAND_LOGO_URLS[brand.name];
    if (!logoUrl) { console.log(`  ! no URL for: ${brand.name}`); continue; }

    const publicId = `brand-${brand.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const cloudUrl = await uploadFromUrl(logoUrl, publicId, 'carshop/brands');
    if (cloudUrl) {
      await Brand.findByIdAndUpdate(brand._id, { image: cloudUrl });
      console.log(`  ✓ ${brand.name}`);
    }
    await sleep(300);
  }
}

async function seedCars() {
  console.log('\n── Cars ──────────────────────────────────────────────');
  const brands = await Brand.find({});
  const brandMap = {};
  for (const b of brands) brandMap[b.name] = b;

  let created = 0;
  for (const carData of ALL_CARS) {
    const existing = await Car.findOne({ slug: carData.slug });
    if (existing) { console.log(`  ~ skip (exists): ${carData.slug}`); continue; }

    const brand = brandMap[carData.brandName];
    if (!brand) { console.log(`  ! brand not found: ${carData.brandName}`); continue; }

    // Upload main image and gallery
    const imgSeed = carData.slug;
    const mainImgUrl  = `https://picsum.photos/seed/${imgSeed}/1200/800`;
    const gallery1Url = `https://picsum.photos/seed/${imgSeed}-front/1200/800`;
    const gallery2Url = `https://picsum.photos/seed/${imgSeed}-side/1200/800`;
    const gallery3Url = `https://picsum.photos/seed/${imgSeed}-interior/1200/800`;

    const folder = 'carshop/cars';
    const [mainImg, g1, g2, g3] = await Promise.all([
      uploadFromUrl(mainImgUrl,  imgSeed,            folder),
      uploadFromUrl(gallery1Url, `${imgSeed}-front`,    folder),
      uploadFromUrl(gallery2Url, `${imgSeed}-side`,     folder),
      uploadFromUrl(gallery3Url, `${imgSeed}-interior`, folder),
    ]);

    const { brandName, ...rest } = carData;
    await Car.create({
      ...rest,
      brandId:   brand._id.toString(),
      brandName: brand.name,
      status:    'Published',
      image:     mainImg || mainImgUrl,
      gallery:   { photos: [g1, g2, g3].filter(Boolean) },
    });

    console.log(`  ✓ ${carData.name}`);
    created++;
    await sleep(400);
  }
  console.log(`  Done: ${created} cars created`);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const run = async () => {
  try {
    configCloudinary();
    await connectDB();

    await seedPartImages();
    await seedBrandLogos();
    await seedCars();

    console.log('\n✅ seedImagesAndCars complete');
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
