// Global colors are now natively inside DUMMY_CARS

import { DUMMY_CARS } from '../../Cars/data/cars.mock';

export const getMockCarDetail = (id) => {
    const baseCar = DUMMY_CARS.find(c => String(c.id) === String(id)) || DUMMY_CARS[0];
    const isSUV = baseCar.bodyStyle === 'SUV';
    const brand = baseCar.brandName || 'Hãng Xe';
    
    return {
        id,
        name: baseCar.name,
        sku: baseCar.sku,
        stock: baseCar.stock || 1,
        tagline: `Tuyệt tác từ ${brand}`,
        image: baseCar.image,
        colors: baseCar.colors,
        price: baseCar.price,
        engine: baseCar.engine,
        power: baseCar.engine.includes('V8') ? '585 HP' : '381 HP',
        versions: [`${baseCar.name} Tiêu chuẩn`, `${baseCar.name} Cao cấp`],
        features: [
            {
                title: `CÔNG NGHỆ ÁNH SÁNG ĐỈNH CAO TỪ ${brand.toUpperCase()}`,
                desc: 'Hệ thống đèn pha siêu sáng tiên phong mang lại độ phân giải triệu pixel đỉnh cao. Hỗ trợ hiển thị cảnh báo và định hướng trong môi trường thiếu sáng, quét chướng ngại vật ngay lập tức.',
                image: isSUV ? 'https://images.unsplash.com/photo-1559415668-38520befaa32?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1603584173870-7f80db7d69d8?auto=format&fit=crop&q=80&w=800'
            },
            {
                title: `KHOANG HẠNG THƯƠNG GIA TRÊN ${baseCar.name.toUpperCase()}`,
                desc: 'Sự kết hợp hoàn hảo giữa vật liệu da Nappa cao cấp sang trọng, phối ốp Walnut nguyên khối và sợi kim loại tinh tế. Cửa sổ trời toàn cảnh, hệ thống giải trí cá nhân cho từng hành khách giúp tối đa hoá sự thư giãn.',
                image: 'https://images.unsplash.com/photo-1620882813840-77a8bcfdb9e7?auto=format&fit=crop&q=80&w=800' 
            }
        ],
        specs: [
            {
                category: 'Động cơ & Truyền động',
                items: [
                    { label: 'Loại Động cơ', value: baseCar.engine },
                    { label: 'Dung tích công tác', value: isSUV ? '3.999 cc' : '2.999 cc' },
                    { label: 'Công suất cực đại', value: baseCar.engine.includes('V8') ? '585 mã lực @ 6000 rpm' : '381 mã lực @ 5800 rpm' },
                    { label: 'Mô-men xoắn', value: baseCar.engine.includes('V8') ? '850 Nm' : '500 Nm' },
                    { label: 'Hộp số', value: brand === 'Porsche' ? 'PDK 8 cấp ly hợp kép' : 'Tự động đa cấp cao cấp' },
                    { label: 'Dẫn động', value: isSUV ? '4 bánh toàn thời gian (AWD)' : 'Cầu sau (RWD)' },
                ]
            },
            {
                category: 'Hiệu suất & Thiết kế',
                items: [
                    { label: 'Tăng tốc 0-100 km/h', value: isSUV ? '5.4 giây' : '4.5 giây' },
                    { label: 'Tốc độ tối đa', value: isSUV ? '250 km/h' : '300 km/h' },
                    { label: 'Dung tích nhiên liệu', value: isSUV ? '85 Lít' : '76 Lít' },
                    { label: 'Kiểu dáng (Body Style)', value: baseCar.bodyStyle }
                ]
            }
        ],
        gallery: baseCar.gallery
    };
};
