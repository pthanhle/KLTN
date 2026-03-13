import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useCarDetailLogic = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [car, setCar] = useState(null);

    // Mock color variants utilizing a CSS filter trick for the demo,
    // since we use a single base car image for every color.
    // In a real project, replace `filterStyle` with `images360: [url, url, ...]` array.
    const colors = [
        { id: 'black', name: 'Đen Trân Châu', value: '#111111', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200', filterStyle: 'brightness(0.15) contrast(1.2) drop-shadow(0 0 10px rgba(0,0,0,0.5))' },
        { id: 'gray', name: 'Xám Tinh Tế', value: '#6b7280', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200', filterStyle: 'grayscale(1) brightness(0.6)' },
        { id: 'white', name: 'Trắng Ngọc Trai', value: '#ffffff', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200', filterStyle: 'brightness(2) contrast(0.8) grayscale(1)' },
        { id: 'red', name: 'Đỏ Thể Thao', value: '#dc2626', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200', filterStyle: 'hue-rotate(-45deg) saturate(2.5) drop-shadow(0 0 15px rgba(220,38,38,0.2))' },
        { id: 'blue', name: 'Xanh Sâu Thẳm', value: '#1e3a8a', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200', filterStyle: 'hue-rotate(180deg) saturate(1.8) brightness(0.7)' }
    ];

    const [selectedColor, setSelectedColor] = useState(colors[0]);

    useEffect(() => {
        setIsLoading(true);
        // Mock fetch API
        const timer = setTimeout(() => {
            setCar({
                id,
                name: 'MERCEDES-BENZ S-CLASS',
                tagline: 'KIÊU HÃNH VƯƠN XA',
                heroImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1920',
                price: 15990000000,
                versions: ['S 450 Luxury', 'Maybach S680'],
                features: [
                    {
                        title: 'CÔNG NGHỆ DIGITAL LIGHT TIÊN PHONG',
                        desc: 'Hai cụm đèn pha Digital Light mang độ phân giải hơn 2 triệu pixel đỉnh cao. Hỗ trợ hiển thị cảnh báo và định hướng trên mặt đường một cách rõ ràng nhờ hệ thống 1.3 triệu vi lăng kính phản xạ ánh sáng.',
                        image: 'https://images.unsplash.com/photo-1559415668-38520befaa32?auto=format&fit=crop&q=80&w=800'
                    },
                    {
                        title: 'KHOANG HẠNG NHẤT TRÊN MẶT ĐẤT',
                        desc: 'Sự kết hợp hoàn hảo giữa vật liệu da Nappa thượng hạng sang trọng, gỗ ốp Walnut và sợi kim loại tinh tế. Hệ thống giải trí cá nhân cho từng hành khách giúp tối ưu không gian riêng tư.',
                        image: 'https://images.unsplash.com/photo-1603584173870-7f80db7d69d8?auto=format&fit=crop&q=80&w=800' // Placeholder 
                    }
                ],
                specs: [
                    {
                        category: 'Động cơ & Truyền động',
                        items: [
                            { label: 'Loại Động cơ', value: 'V6 Biturbo' },
                            { label: 'Dung tích công tác', value: '2.999 cc' },
                            { label: 'Công suất cực đại', value: '381 mã lực @ 5800 - 6100 vòng/phút' },
                            { label: 'Mô-men xoắn cực đại', value: '500 Nm @ 1800 - 5800 vòng/phút' },
                            { label: 'Hộp số', value: 'Tự động 9 cấp 9G-TRONIC' },
                            { label: 'Dẫn động', value: '4 bánh toàn thời gian 4MATIC' },
                        ]
                    },
                    {
                        category: 'Hiệu suất (Performance)',
                        items: [
                            { label: 'Tăng tốc 0-100 km/h', value: '4.9 giây' },
                            { label: 'Tốc độ tối đa', value: '250 km/h' },
                            { label: 'Trọng lượng bản thân', value: '2,075 kg' },
                        ]
                    },
                    {
                        category: 'Kích thước & Thiết kế',
                        items: [
                            { label: 'D x R x C', value: '5289 x 1921 x 1502 mm' },
                            { label: 'Chiều dài cơ sở', value: '3216 mm' },
                            { label: 'Dung tích bình nhiên liệu', value: '76 L' },
                            { label: 'Kích thước mâm xe', value: '19-inch đa chấu' }
                        ]
                    }
                ],
                gallery: [
                    'https://images.unsplash.com/photo-1620882813840-77a8bcfdb9e7?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1503376710349-41b8bc22839b?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1629897034444-2f22b826fdb1?auto=format&fit=crop&q=80&w=800'
                ]
            });
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [id]);

    return {
        isLoading,
        car,
        colors,
        selectedColor,
        setSelectedColor
    };
};
