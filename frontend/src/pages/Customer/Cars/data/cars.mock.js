export const CAR_COLORS_PALETTE = [
    { id: 'black', name: 'Đen Trân Châu', value: '#111111', filterStyle: 'brightness(0.15) contrast(1.2) drop-shadow(0 0 10px rgba(0,0,0,0.5))' },
    { id: 'gray', name: 'Xám Tinh Tế', value: '#6b7280', filterStyle: 'grayscale(1) brightness(0.6)' },
    { id: 'white', name: 'Trắng Ngọc Trai', value: '#ffffff', filterStyle: 'brightness(2) contrast(0.8) grayscale(1)' },
    { id: 'red', name: 'Đỏ Thể Thao', value: '#dc2626', filterStyle: 'hue-rotate(-45deg) saturate(2.5) drop-shadow(0 0 15px rgba(220,38,38,0.2))' },
    { id: 'blue', name: 'Xanh Sâu Thẳm', value: '#1e3a8a', filterStyle: 'hue-rotate(180deg) saturate(1.8) brightness(0.7)' }
];

export const DUMMY_CARS = [
    { id: 1, sku: 'CAR-001', stock: 1, brandId: 'mercedes-benz', name: 'Mercedes-Benz S450 Luxury', brandName: 'Mercedes-Benz', year: 2023, odo: 5000, engine: '3.0L', fuel: 'Xăng', seats: 5, price: 5499000000, bodyStyle: 'Sedan', isNew: false, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
    { id: 2, sku: 'CAR-002', stock: 1, brandId: 'mercedes-benz', name: 'Mercedes-AMG G63', brandName: 'Mercedes-Benz', year: 2022, odo: 12000, engine: '4.0L V8', fuel: 'Xăng', seats: 5, price: 12800000000, bodyStyle: 'SUV', isNew: false, image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=600' },
    { id: 3, sku: 'CAR-003', stock: 1, brandId: 'mercedes-benz', name: 'Mercedes-Benz GLS 450', brandName: 'Mercedes-Benz', year: 2024, odo: 0, engine: '3.0L', fuel: 'Xăng', seats: 7, price: 5389000000, bodyStyle: 'SUV', isNew: true, image: 'https://images.unsplash.com/photo-1559415668-38520befaa32?auto=format&fit=crop&q=80&w=600' },
    { id: 4, sku: 'CAR-004', stock: 1, brandId: 'mercedes-benz', name: 'Mercedes-Benz E300 AMG', brandName: 'Mercedes-Benz', year: 2023, odo: 1200, engine: '2.0L', fuel: 'Xăng', seats: 5, price: 2850000000, bodyStyle: 'Sedan', isNew: false, image: 'https://images.unsplash.com/photo-1620882813840-77a8bcfdb9e7?auto=format&fit=crop&q=80&w=600' },
    { id: 5, sku: 'CAR-005', stock: 1, brandId: 'mercedes-benz', name: 'Mercedes-Maybach S680', brandName: 'Mercedes-Benz', year: 2024, odo: 0, engine: '6.0L V12', fuel: 'Xăng', seats: 4, price: 18990000000, bodyStyle: 'Sedan', isNew: true, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600' },
    { id: 6, sku: 'CAR-006', stock: 1, brandId: 'mercedes-benz', name: 'Mercedes-Benz C300 AMG', brandName: 'Mercedes-Benz', year: 2023, odo: 8500, engine: '2.0L', fuel: 'Xăng', seats: 5, price: 1950000000, bodyStyle: 'Sedan', isNew: false, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600' },
    { id: 7, sku: 'CAR-007', stock: 1, brandId: 'bmw', name: 'BMW 740i Pure Excellence', brandName: 'BMW', year: 2024, odo: 0, engine: '3.0L', fuel: 'Xăng', seats: 5, price: 6200000000, bodyStyle: 'Sedan', isNew: true, image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=600' },
    { id: 8, sku: 'CAR-008', stock: 1, brandId: 'audi', name: 'Audi Q8 S-line', brandName: 'Audi', year: 2022, odo: 15000, engine: '3.0L', fuel: 'Xăng', seats: 5, price: 4500000000, bodyStyle: 'SUV', isNew: false, image: 'https://images.unsplash.com/photo-1603584173870-7f80db7d69d8?auto=format&fit=crop&q=80&w=600' },
    { id: 9, sku: 'CAR-009', stock: 1, brandId: 'porsche', name: 'Porsche 911 Carrera S', brandName: 'Porsche', year: 2021, odo: 21000, engine: '3.0L', fuel: 'Xăng', seats: 4, price: 8200000000, bodyStyle: 'Coupe', isNew: false, image: 'https://images.unsplash.com/photo-1503376710349-41b8bc22839b?auto=format&fit=crop&q=80&w=600' },
    { id: 10, sku: 'CAR-0010', stock: 1, brandId: 'lexus', name: 'Lexus LX600 VIP', brandName: 'Lexus', year: 2024, odo: 0, engine: '3.5L V6', fuel: 'Xăng', seats: 4, price: 9250000000, bodyStyle: 'SUV', isNew: true, image: 'https://images.unsplash.com/photo-1629897034444-2f22b826fdb1?auto=format&fit=crop&q=80&w=600' },
].map((car) => {
    const isSUV = car.bodyStyle === 'SUV';
    const brand = car.brandName || 'Hãng Xe';
    
    return {
        ...car,
        description: `Chiếc ${car.name} là sự kết tinh của thiết kế tinh xảo và động cơ mạnh mẽ. Trang bị hàng loạt tính năng công nghệ di động tiên tiến hàng đầu trong phân khúc ${car.bodyStyle}.`,
        tagline: `Tuyệt tác từ ${brand}`,
        slug: car.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
        metaTitle: `${car.name} | TT AUTO - Đẳng Cấp Siêu Xe`,
        metaDescription: `Khám phá ${car.name}. Trải nghiệm đỉnh cao công nghệ và sự sang trọng. Hỗ trợ trả góp, lái thử tận nhà.`,
        metaKeywords: [brand, car.name, car.bodyStyle, 'Luxury Car'],
        ogImage: car.image,
        salePrice: car.price - 100000000,
        availableShowrooms: ['SR-HCM-01', 'SR-HN-01'],
        outOfStockBehavior: 'pre_order',
        versions: [`${car.name} Tiêu chuẩn`, `${car.name} Cao cấp`],
        colors: CAR_COLORS_PALETTE.slice(0, (car.id % 3) + 3), // Assigns 3 to 5 colors dynamically per car
        power: car.engine.includes('V8') ? '585 HP' : '381 HP', // Essential field for both Form and TestDrive Summary
        features: [
            {
                title: `CÔNG NGHỆ ÁNH SÁNG ĐỈNH CAO TỪ ${brand.toUpperCase()}`,
                desc: 'Hệ thống đèn pha siêu sáng tiên phong mang lại độ phân giải triệu pixel đỉnh cao. Hỗ trợ hiển thị cảnh báo và định hướng.',
                image: isSUV ? 'https://images.unsplash.com/photo-1559415668-38520befaa32?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1603584173870-7f80db7d69d8?auto=format&fit=crop&q=80&w=800'
            },
            {
                title: `KHOANG HẠNG THƯƠNG GIA TRÊN ${car.name.toUpperCase()}`,
                desc: 'Sự kết hợp hoàn hảo giữa vật liệu da Nappa cao cấp sang trọng, phối ốp Walnut nguyên khối và sợi kim loại tinh tế.',
                image: 'https://images.unsplash.com/photo-1620882813840-77a8bcfdb9e7?auto=format&fit=crop&q=80&w=800' 
            }
        ],
        specs: [
            {
                category: 'Động cơ & Truyền động',
                items: [
                    { label: 'Loại Động cơ', value: car.engine },
                    { label: 'Công suất cực đại', value: car.engine.includes('V8') ? '585 HP' : '381 HP' },
                    { label: 'Mô-men xoắn', value: car.engine.includes('V8') ? '850 Nm' : '500 Nm' },
                    { label: 'Hộp số', value: brand === 'Porsche' ? 'PDK' : 'Tự động đa cấp' },
                    { label: 'Dẫn động', value: isSUV ? 'AWD' : 'RWD' },
                ]
            },
            {
                category: 'Hiệu suất & Thiết kế',
                items: [
                    { label: 'Tăng tốc 0-100', value: isSUV ? '5.4 giây' : '4.5 giây' },
                    { label: 'Tốc độ tối đa', value: isSUV ? '250 km/h' : '300 km/h' },
                    { label: 'Dung tích nhiên liệu', value: isSUV ? '85 L' : '76 L' }
                ]
            }
        ],
        gallery: {
            photos: [
                car.image,
                'https://images.unsplash.com/photo-1620882813840-77a8bcfdb9e7?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800'
            ].sort(() => 0.5 - Math.random()),
            videos: [
                {
                    url: 'https://youtube.com/watch?v=mock1',
                    title: 'Official Commercial',
                    duration: '01:30',
                    thumbnail: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800'
                },
                {
                    url: 'https://youtube.com/watch?v=mock2',
                    title: 'Track Performance Test',
                    duration: '08:45',
                    thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
                }
            ]
        },
        threeSixty: {
            images: Array.from({ length: 36 }, (_, i) => `https://placehold.co/1200x675/1e1e20/eab308/png?text=Angle+${(i * 10).toString().padStart(3, '0')}&font=Montserrat`),
            lighting: 'HDR Studio Bright',
            environment: 'Minimalist Concrete'
        }
    };
});

export const BODY_STYLES = [
    { label: 'Tất cả', value: 'Tất cả' },
    { label: 'Sedan', value: 'Sedan' },
    { label: 'SUV', value: 'SUV' },
    { label: 'Coupe', value: 'Coupe' },
    { label: 'Cabriolet', value: 'Cabriolet' },
];
