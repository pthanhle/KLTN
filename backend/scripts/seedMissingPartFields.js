/**
 * seedMissingPartFields.js
 *
 * Patches existing parts that are missing specs, fitment_data, options, or
 * have status='draft'. Safe to run multiple times – skips any field that is
 * already populated so it never overwrites real data.
 *
 * Run:  node --env-file=.env scripts/seedMissingPartFields.js
 */
import mongoose from 'mongoose';
import Part from '../models/partModel.js';

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`✅ MongoDB: ${conn.connection.host}`);
};

// ─── SPECS LOOKUP BY SKU ──────────────────────────────────────────────────────
// Matches the parts created by seedDatabase.js
const SPECS_BY_SKU = {
  'PT-LOC-001': [{ label: 'Mã OEM', value: '90915-03003' }, { label: 'Thread', value: '3/4-16 UNF' }, { label: 'Áp suất bypass', value: '1.0 bar' }, { label: 'Lưu lượng lọc', value: '> 99%' }],
  'PT-LOC-002': [{ label: 'Mã OEM', value: '17220-5PA-A00' }, { label: 'Kích thước', value: '306×175×45 mm' }, { label: 'Vật liệu', value: 'Cellulose cao cấp' }, { label: 'Hiệu suất lọc', value: '>99.5%' }],
  'PT-LOC-003': [{ label: 'Mã OEM', value: '31911-2B900' }, { label: 'Loại', value: 'Lọc nhiên liệu inline' }, { label: 'Áp suất làm việc', value: '500 kPa' }],
  'PT-LOC-004': [{ label: 'Mã OEM', value: '87139-0K010' }, { label: 'Loại lọc', value: 'Lọc kép than hoạt tính' }, { label: 'Kích thước', value: '210×195×25 mm' }, { label: 'Tuổi thọ', value: '15.000 km' }],
  'PT-BUG-001': [{ label: 'Loại', value: 'Iridium' }, { label: 'Heat Range', value: '6' }, { label: 'Gap', value: '0.8 mm' }, { label: 'Thread', value: 'M14×1.25' }, { label: 'Điện cực trung tâm', value: 'Iridium 0.6 mm' }],
  'PT-BUG-002': [{ label: 'Loại', value: 'Laser Iridium' }, { label: 'Gap', value: '1.1 mm' }, { label: 'Thread', value: 'M14×1.25' }, { label: 'Điện áp mồi', value: 'Thấp hơn 20%' }, { label: 'Tuổi thọ', value: '100.000 km' }],
  'PT-BUG-003': [{ label: 'Loại', value: 'Iridium Power' }, { label: 'Thread', value: 'M14×1.25' }, { label: 'Gap', value: '1.0 mm' }, { label: 'Điện cực', value: 'Iridium 0.4 mm' }],
  'PT-BUG-004': [{ label: 'Vị trí', value: 'Upstream (trước bộ xúc tác)' }, { label: 'Số dây', value: '4 dây (Wideband)' }, { label: 'Điện áp ra', value: '0–5V' }, { label: 'Nhiệt độ hoạt động', value: 'lên đến 850°C' }],
  'PT-PH-001':  [{ label: 'Mã Brembo', value: 'P06020' }, { label: 'Vị trí', value: 'Trước' }, { label: 'Loại vật liệu', value: 'NAO Ceramic' }, { label: 'Số tấm', value: '4 tấm / bộ' }],
  'PT-PH-002':  [{ label: 'Đường kính', value: '300 mm' }, { label: 'Độ dày mới', value: '28 mm' }, { label: 'Độ dày tối thiểu', value: '22 mm' }, { label: 'Loại', value: 'Đĩa thông gió (Vented)' }],
  'PT-PH-003':  [{ label: 'Vị trí', value: 'Sau' }, { label: 'Loại', value: 'Ceramic' }, { label: 'Số tấm', value: '4 tấm / bộ' }, { label: 'Độ dày', value: '13.5 mm' }],
  'PT-PH-004':  [{ label: 'Tiêu chuẩn', value: 'DOT4' }, { label: 'Dung tích', value: '500 ml' }, { label: 'Điểm sôi khô', value: '265°C' }, { label: 'Điểm sôi ướt', value: '180°C' }],
  'PT-LM-001':  [{ label: 'Tỉ lệ pha', value: '50/50 sẵn dùng' }, { label: 'Bảo vệ chống đông', value: '-37°C' }, { label: 'Màu sắc', value: 'Vàng/Xanh lá' }, { label: 'Tuổi thọ', value: '5 năm / 250.000 km' }],
  'PT-LM-002':  [{ label: 'Kích thước lõi', value: '653×380×16 mm' }, { label: 'Vật liệu', value: 'Nhôm' }, { label: 'Số hàng ống', value: '2 hàng' }, { label: 'Kiểu kết nối', value: 'Ngang / Side-flow' }],
  'PT-LM-003':  [{ label: 'Mã OEM', value: '19200-5R0-004' }, { label: 'Kiểu truyền động', value: 'Belt-driven' }, { label: 'Lưu lượng bơm', value: '100 L/phút' }],
  'PT-LOP-001': [{ label: 'Kích thước', value: '225/45R18' }, { label: 'Load Index', value: '91' }, { label: 'Speed Rating', value: 'Y (300 km/h)' }, { label: 'Wet Braking (UTQG)', value: 'AA' }, { label: 'Fuel Efficiency', value: 'A' }],
  'PT-LOP-002': [{ label: 'Kích thước', value: '205/65R16' }, { label: 'Load Index', value: '95' }, { label: 'Speed Rating', value: 'V (240 km/h)' }, { label: 'Đặc điểm', value: 'Low rolling resistance' }, { label: 'Fuel Efficiency', value: 'A' }],
  'PT-LOP-003': [{ label: 'Kích thước', value: '265/65R17' }, { label: 'Speed Rating', value: 'H (210 km/h)' }, { label: 'Pattern', value: 'A/T (All-Terrain)' }, { label: 'Load Index', value: '112' }, { label: 'Ứng dụng', value: 'SUV / Pick-up' }],
  'PT-ACQ-001': [{ label: 'Dung lượng', value: '65 Ah' }, { label: 'CCA (Khởi động lạnh)', value: '610 A' }, { label: 'Kích thước (D×R×C)', value: '242×175×190 mm' }, { label: 'Cực', value: 'L2 (cực dương bên trái)' }, { label: 'Công nghệ', value: 'EFB – Enhanced Flooded Battery' }],
  'PT-ACQ-002': [{ label: 'Dung lượng', value: '74 Ah' }, { label: 'CCA', value: '680 A' }, { label: 'Cực', value: 'L3' }, { label: 'Kích thước', value: '278×175×190 mm' }, { label: 'Công nghệ', value: 'AGM – Absorbent Glass Mat' }],
  'PT-DAU-001': [{ label: 'Độ nhớt', value: '5W-30' }, { label: 'Tiêu chuẩn', value: 'ACEA C3, BMW LL-04, MB 229.51' }, { label: 'Dung tích', value: '4 lít' }, { label: 'Loại dầu gốc', value: 'Full Synthetic' }, { label: 'Chu kỳ thay', value: '15.000 km' }],
  'PT-DAU-002': [{ label: 'Độ nhớt', value: '10W-60' }, { label: 'Ứng dụng', value: 'Xe thể thao, hiệu suất cao' }, { label: 'Dung tích', value: '4 lít' }, { label: 'Loại dầu gốc', value: 'Full Synthetic' }, { label: 'Tiêu chuẩn', value: 'API SN / ACEA A3/B4' }],
  'PT-DAU-003': [{ label: 'Độ nhớt', value: '0W-20' }, { label: 'Tiêu chuẩn', value: 'API SN PLUS, ILSAC GF-5, dexos1' }, { label: 'Dung tích', value: '4 lít' }, { label: 'Loại dầu gốc', value: 'Full Synthetic' }, { label: 'Chu kỳ thay', value: '10.000 km' }],
  'PT-TD-001':  [{ label: 'Số răng', value: '122T' }, { label: 'Chiều rộng', value: '25 mm' }, { label: 'Bao gồm', value: 'Dây curoa + con lăn căng' }, { label: 'Vật liệu', value: 'HNBR gia cố sợi thủy tinh' }, { label: 'Tuổi thọ', value: '100.000 km' }],
  'PT-TD-002':  [{ label: 'Đường kính đĩa', value: '228 mm' }, { label: 'Bao gồm', value: 'Đĩa ly hợp + bàn ép + vòng bi cắt' }, { label: 'Lực ép', value: 'Theo tiêu chuẩn OEM' }, { label: 'Vật liệu đĩa', value: 'Organic High-Friction' }],
  'PT-GMUON-001': [{ label: 'Chiều dài', value: '650 mm (26 inch)' }, { label: 'Loại', value: 'Flat / Frameless' }, { label: 'Kết nối', value: 'Hook adapter 9×4 mm' }, { label: 'Vật liệu cao su', value: 'EPDM chịu UV' }],
  'PT-GMUON-002': [{ label: 'Bao gồm', value: 'Gạt lái 650mm + gạt phụ 400mm' }, { label: 'Loại', value: 'Flat + Flat (bộ 2 chiếc)' }, { label: 'Kết nối', value: 'Hook + Pin adapter' }, { label: 'Bộ phụ tùng', value: 'Tương thích Mazda 3 BP 2019+' }],
  'PT-TREO-001': [{ label: 'Loại', value: 'Twin-tube thủy lực' }, { label: 'Vị trí', value: 'Trước' }, { label: 'Kiểu lắp', value: 'Strut (MacPherson)' }, { label: 'Áp suất gas', value: 'Không áp' }, { label: 'Điều chỉnh', value: 'Không điều chỉnh (B4 Standard)' }],
  'PT-TREO-002': [{ label: 'Bao gồm', value: '2 giảm xóc sau' }, { label: 'Loại', value: 'Gas pressure' }, { label: 'Kiểu lắp', value: 'Monotube' }, { label: 'Tuổi thọ', value: '80.000 km' }],
  'PT-DEN-001':  [{ label: 'Loại chân', value: 'H4 (P43t)' }, { label: 'Công suất', value: '60/55W' }, { label: 'Độ sáng', value: '+200% so với tiêu chuẩn ECE R112' }, { label: 'Nhiệt độ màu', value: '3.200K' }, { label: 'Số lượng', value: 'Bộ 2 bóng' }],
  'PT-DEN-002':  [{ label: 'Loại chân', value: 'H7 (PX26d)' }, { label: 'Công suất', value: '55W' }, { label: 'Nhiệt độ màu', value: '3.500K' }, { label: 'Độ sáng', value: '+130% tầm nhìn' }, { label: 'Số lượng', value: 'Bộ 2 bóng' }],
};

// ─── FITMENT DATA BY COMPATIBLE BRAND + CATEGORY ────────────────────────────
const FITMENT_MAP = {
  'Toyota': [
    { brand: 'Toyota', model: 'Camry 2.0 / 2.5', yearRange: '2019–2024' },
    { brand: 'Toyota', model: 'Vios 1.5', yearRange: '2018–2024' },
    { brand: 'Toyota', model: 'Fortuner 2.4 / 2.8', yearRange: '2020–2024' },
    { brand: 'Toyota', model: 'Innova 2.0 / Innova Cross', yearRange: '2018–2024' },
  ],
  'Honda': [
    { brand: 'Honda', model: 'CR-V 1.5T / 2.0 Hybrid', yearRange: '2018–2024' },
    { brand: 'Honda', model: 'City 1.5', yearRange: '2020–2024' },
    { brand: 'Honda', model: 'Civic 1.5T / RS', yearRange: '2019–2024' },
    { brand: 'Honda', model: 'HR-V 1.5T', yearRange: '2021–2024' },
  ],
  'Hyundai': [
    { brand: 'Hyundai', model: 'Tucson 2.0 / 1.6T', yearRange: '2021–2024' },
    { brand: 'Hyundai', model: 'Santa Fe 2.2 Diesel', yearRange: '2019–2024' },
    { brand: 'Hyundai', model: 'Accent 1.4', yearRange: '2018–2024' },
  ],
  'Mazda': [
    { brand: 'Mazda', model: 'Mazda 3 2.0 / 1.5', yearRange: '2019–2024' },
    { brand: 'Mazda', model: 'Mazda CX-5 2.0 / 2.5', yearRange: '2018–2024' },
    { brand: 'Mazda', model: 'Mazda 6 2.5', yearRange: '2018–2023' },
  ],
  'BMW': [
    { brand: 'BMW', model: '3 Series (G20) 320i / 330i', yearRange: '2019–2024' },
    { brand: 'BMW', model: '5 Series (G30) 520i / 530i', yearRange: '2018–2024' },
    { brand: 'BMW', model: 'X3 xDrive20i / xDrive30i', yearRange: '2018–2024' },
  ],
  'Mercedes-Benz': [
    { brand: 'Mercedes-Benz', model: 'C200 / C300 AMG Line', yearRange: '2019–2024' },
    { brand: 'Mercedes-Benz', model: 'E200 / E300 AMG', yearRange: '2018–2024' },
    { brand: 'Mercedes-Benz', model: 'GLC 200 / GLC 300', yearRange: '2020–2024' },
  ],
  'Audi': [
    { brand: 'Audi', model: 'A4 35 TFSI / 40 TFSI', yearRange: '2019–2024' },
    { brand: 'Audi', model: 'Q5 40 TFSI / 45 TFSI', yearRange: '2018–2024' },
    { brand: 'Audi', model: 'A6 45 TFSI', yearRange: '2019–2023' },
  ],
  'Ford': [
    { brand: 'Ford', model: 'Ranger XLS / XLT / Wildtrak', yearRange: '2019–2024' },
    { brand: 'Ford', model: 'Everest Titanium / Platinum', yearRange: '2018–2024' },
    { brand: 'Ford', model: 'Territory 1.5T EcoBoost', yearRange: '2021–2024' },
  ],
  'Kia': [
    { brand: 'Kia', model: 'Seltos 1.4T / 1.6T', yearRange: '2020–2024' },
    { brand: 'Kia', model: 'Sorento 2.2D / 2.5T', yearRange: '2021–2024' },
    { brand: 'Kia', model: 'K5 2.0 / 2.5 GT-line', yearRange: '2020–2024' },
  ],
  'Mitsubishi': [
    { brand: 'Mitsubishi', model: 'Xpander 1.5', yearRange: '2018–2024' },
    { brand: 'Mitsubishi', model: 'Outlander 2.0 / 2.4', yearRange: '2019–2024' },
    { brand: 'Mitsubishi', model: 'Attrage 1.2', yearRange: '2018–2023' },
  ],
};

// ─── OPTIONS BY CATEGORY ─────────────────────────────────────────────────────
// Only for categories where variant selection makes sense
const OPTIONS_BY_CATEGORY = {
  'den-chieu-sang': [
    { type: 'Số lượng', choices: ['Bộ 2 bóng (khuyến nghị)', '1 bóng đơn'] },
  ],
  'dau-dung-dich': [
    { type: 'Dung tích', choices: ['1 lít', '4 lít (tiêu chuẩn)', '5 lít', '10 lít'] },
  ],
  'gat-mua-kinh': [
    { type: 'Vị trí', choices: ['Gạt lái (Driver)', 'Gạt phụ (Passenger)', 'Bộ đôi (cả 2)'] },
  ],
  'he-thong-phanh': [
    { type: 'Vị trí lắp', choices: ['Bánh trước', 'Bánh sau', 'Bộ đầy đủ (4 bánh)'] },
  ],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function buildFitmentData(compatibleBrands) {
  if (!compatibleBrands || compatibleBrands.length === 0) return [];
  const result = [];
  for (const brand of compatibleBrands) {
    const entries = FITMENT_MAP[brand];
    if (entries) result.push(...entries);
  }
  return result;
}

function buildOptions(category) {
  return OPTIONS_BY_CATEGORY[category] || [];
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const run = async () => {
  try {
    await connectDB();

    const parts = await Part.find({});
    console.log(`\nFound ${parts.length} parts in database\n`);

    let patchedCount = 0;

    for (const part of parts) {
      const update = {};
      const reasons = [];

      // 1. specs – fill if empty AND we have data for this SKU
      const hasSpecs = part.specs && part.specs.length > 0;
      if (!hasSpecs) {
        const specsData = SPECS_BY_SKU[part.sku];
        if (specsData) {
          update.specs = specsData;
          reasons.push('specs');
        } else {
          console.log(`  ⚠  No spec template for SKU: ${part.sku} (${part.name.substring(0, 40)})`);
        }
      }

      // 2. fitment_data – fill if empty AND compatible_brands is set
      const hasFitment = part.fitment_data && part.fitment_data.length > 0;
      if (!hasFitment) {
        const fitment = buildFitmentData(part.compatible_brands);
        if (fitment.length > 0) {
          update.fitment_data = fitment;
          reasons.push('fitment_data');
        }
      }

      // 3. options – fill if empty AND category has predefined options
      const hasOptions = part.options && part.options.length > 0;
      if (!hasOptions) {
        const opts = buildOptions(part.category);
        if (opts.length > 0) {
          update.options = opts;
          reasons.push('options');
        }
      }

      // 4. status – flip draft → active
      if (part.status === 'draft') {
        update.status = 'active';
        reasons.push('status→active');
      }

      // Apply update only if something needs patching
      if (Object.keys(update).length > 0) {
        await Part.findByIdAndUpdate(part._id, { $set: update });
        patchedCount++;
        console.log(`  ✓ ${part.sku.padEnd(16)} [${reasons.join(', ')}]`);
      } else {
        console.log(`  ~ skip (complete): ${part.sku}`);
      }
    }

    console.log(`\n✅ Done – ${patchedCount} / ${parts.length} parts patched`);
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();
