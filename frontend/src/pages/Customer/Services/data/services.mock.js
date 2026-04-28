export const MOCK_SERVICES_DATA = [
    {
        _id: 'srv_1',
        sku: 'B-SERV-MB',
        serviceName: 'Bảo dưỡng định kỳ (B-Service) Mercedes',
        description: 'Bao gồm thay dầu động cơ, thay lọc dầu, kiểm tra hệ thống phanh, kiểm tra nước làm mát, vệ sinh lọc gió, quét lỗi phần mềm chẩn đoán chuyên sâu (Xentry). Khuyến cáo sau mỗi 10,000 km.',
        priceType: 'STARTING_AT',
        basePrice: 4500000,
        estimatedDuration: 120, // phút
        category: 'Bảo dưỡng',
        isActive: true,
        isPackage: true,
        image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800'
    },
    {
        _id: 'srv_2',
        sku: 'CHK-160-PRE',
        serviceName: 'Kiểm tra tổng quát 160 điểm (Pre-Purchase)',
        description: 'Dành cho xe mới hoặc trước khi mua bán. Đội ngũ chuyên gia sẽ lên cầu kẹp thiết bị đo nội soi gầm, động cơ, khung gầm và hệ thống điện mạch.',
        priceType: 'FIXED',
        basePrice: 2800000,
        estimatedDuration: 90,
        category: 'Bảo dưỡng',
        isActive: true,
        isPackage: true,
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=800'
    },
    {
        _id: 'srv_3',
        sku: 'CRM-DIA-01',
        serviceName: 'Phủ Ceramic Siêu Bóng (Gói Diamond)',
        description: 'Đánh bóng hiệu chỉnh bề mặt sơn 3 bước. Phủ 3 lớp Ceramic chuẩn 9H+ từ Đức (Kisho/CarPro). Bảo hành độ bóng 5 năm.',
        priceType: 'STARTING_AT',
        basePrice: 18500000,
        estimatedDuration: 2880, // 2 days in minutes
        category: 'Làm đẹp',
        isActive: true,
        isPackage: true,
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800'
    },
    {
        _id: 'srv_4',
        sku: 'TIRE-BAL-01',
        serviceName: 'Thay mâm vỏ và Cân bằng động Road Force',
        description: 'Hệ thống Hunter cân bằng động và kẹp chì. Miễn phí hệ thống bơm khí Nitơ tinh khiết cho 4 lốp.',
        priceType: 'FIXED',
        basePrice: 1200000,
        estimatedDuration: 60,
        category: 'Mâm lốp',
        isActive: true,
        isPackage: false,
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800'
    },
    {
        _id: 'srv_5',
        sku: 'ENG-DIA-01',
        serviceName: 'Đại Tu Động Cơ Chuyên Sâu',
        description: 'Hạ máy, rã cỗ máy, kiểm tra các xupap, xéc măng, tay biên. Cần có chuyên gia đánh giá trực tiếp mức độ hao mòn.',
        priceType: 'CONTACT',
        basePrice: 0,
        estimatedDuration: null,
        category: 'Sửa chữa',
        isActive: true,
        isPackage: false,
        image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800'
    }
];
