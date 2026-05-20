import 'package:flutter/material.dart';
import '../models/walkaround_model.dart';
import '../models/service_package_model.dart';
import '../models/checklist_item_model.dart';

final WalkaroundModel mockWalkaroundData = WalkaroundModel(
  orderId: 'NEW_RO',
  customerComplaint: 'Xe có tiếng kêu rít khi phanh',
  selectedPackages: [
    const ServicePackageModel(
      id: 'srv_1',
      sku: 'B-SERV-MB',
      name: 'Bảo dưỡng định kỳ (B-Service) Mercedes',
      description: 'Bao gồm thay dầu động cơ, thay lọc dầu, kiểm tra hệ thống phanh, kiểm tra nước làm mát, vệ sinh lọc gió...',
      priceType: 'STARTING_AT',
      basePrice: 4500000,
      estimatedDuration: 120,
      category: 'Bảo dưỡng',
      isActive: true,
      isPackage: true,
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800',
    ),
  ],
  fuelLevel: 0.5,
  odometer: 0,
  hotspots: const [],
  checklist: const [
    ChecklistItemModel(id: '1', name: 'Tài sản (Tiền mặt, Kính râm)', checked: true),
    ChecklistItemModel(id: '2', name: 'Tình trạng đèn chiếu sáng', checked: true),
    ChecklistItemModel(id: '3', name: 'Lốp xe và Mâm xe', checked: true),
  ],
  signatureData: null,
);

final List<ServicePackageModel> mockServicePackages = [
  const ServicePackageModel(
    id: 'srv_1',
    sku: 'B-SERV-MB',
    name: 'Bảo dưỡng định kỳ (B-Service) Mercedes',
    description: 'Bao gồm thay dầu động cơ, thay lọc dầu, kiểm tra hệ thống phanh, kiểm tra nước làm mát, vệ sinh lọc gió, quét lỗi phần mềm chẩn đoán chuyên sâu (Xentry). Khuyến cáo sau mỗi 10,000 km.',
    priceType: 'STARTING_AT',
    basePrice: 4500000,
    estimatedDuration: 120,
    category: 'Bảo dưỡng',
    isActive: true,
    isPackage: true,
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800'
  ),
  const ServicePackageModel(
    id: 'srv_2',
    sku: 'CHK-160-PRE',
    name: 'Kiểm tra tổng quát 160 điểm (Pre-Purchase)',
    description: 'Dành cho xe mới hoặc trước khi mua bán. Đội ngũ chuyên gia sẽ lên cầu kẹp thiết bị đo nội soi gầm, động cơ, khung gầm và hệ thống điện mạch.',
    priceType: 'FIXED',
    basePrice: 2800000,
    estimatedDuration: 90,
    category: 'Bảo dưỡng',
    isActive: true,
    isPackage: true,
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=800'
  ),
  const ServicePackageModel(
    id: 'srv_3',
    sku: 'CRM-DIA-01',
    name: 'Phủ Ceramic Siêu Bóng (Gói Diamond)',
    description: 'Đánh bóng hiệu chỉnh bề mặt sơn 3 bước. Phủ 3 lớp Ceramic chuẩn 9H+ từ Đức (Kisho/CarPro). Bảo hành độ bóng 5 năm.',
    priceType: 'STARTING_AT',
    basePrice: 18500000,
    estimatedDuration: 2880,
    category: 'Chăm sóc xe',
    isActive: true,
    isPackage: true,
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800'
  ),
  const ServicePackageModel(
    id: 'srv_4',
    sku: 'TIRE-BAL-01',
    name: 'Thay mâm vỏ và Cân bằng động Road Force',
    description: 'Hệ thống Hunter cân bằng động và kẹp chì. Miễn phí hệ thống bơm khí Nitơ tinh khiết cho 4 lốp.',
    priceType: 'FIXED',
    basePrice: 1200000,
    estimatedDuration: 60,
    category: 'Phụ kiện & Đồ chơi',
    isActive: true,
    isPackage: false,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800'
  ),
  const ServicePackageModel(
    id: 'srv_5',
    sku: 'ENG-DIA-01',
    name: 'Đại Tu Động Cơ Chuyên Sâu',
    description: 'Hạ máy, rã cỗ máy, kiểm tra các xupap, xéc măng, tay biên. Cần có chuyên gia đánh giá trực tiếp mức độ hao mòn.',
    priceType: 'CONTACT',
    basePrice: 0,
    estimatedDuration: null,
    category: 'Sửa chữa chung',
    isActive: true,
    isPackage: false,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800'
  ),
  const ServicePackageModel(
    id: 'srv_6',
    sku: 'ALIGN-HUNTER',
    name: 'Cân chỉnh thước lái điện tử Hunter 3D',
    description: 'Kiểm tra và cân chỉnh độ chụm, góc Camber, Caster bằng hệ thống máy Hunter 3D hiện đại nhất.',
    priceType: 'FIXED',
    basePrice: 600000,
    estimatedDuration: 45,
    category: 'Sửa chữa chung',
    isActive: true,
    isPackage: false,
    image: 'https://images.unsplash.com/photo-1503376712391-7f917df9a65f?auto=format&fit=crop&q=80&w=800'
  )
];
