import { useState, useEffect } from 'react';

/**
 * Separates the business logic (data fetching, state management)
 * from the UI components to maintain strict micro-component architecture.
 */
export const useHomeLogic = () => {
    // Simulated data states (Would typically use Redux/React-Query)
    const [featuredCars, setFeaturedCars] = useState([]);
    const [recentHistory, setRecentHistory] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        // Mock API Fetching matching Backend models (Product/Car, Brand, TradeIn, etc.)
        const mockFeaturedCars = [
            { id: 1, name: 'Mercedes-Benz G63', subtitle: 'Biểu tượng của quyền lực', image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800&auto=format&fit=crop' },
            { id: 2, name: 'Porsche 911 Turbo S', subtitle: 'Cảm xúc thuần khiết', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop' },
            { id: 3, name: 'Range Rover Autobiography', subtitle: 'Đỉnh cao của sự sang trọng', image: 'https://images.unsplash.com/photo-1606016159991-efaee400ccdb?q=80&w=800&auto=format&fit=crop' },
            { id: 4, name: 'Lamborghini Urus S', subtitle: 'Siêu SUV không đối thủ', image: 'https://images.unsplash.com/photo-1620882357774-fbfa943ed2d6?q=80&w=800&auto=format&fit=crop' },
        ];

        const mockRecentHistory = [
            { id: 10, name: 'Audi RS7 Sportback', engine: '4.0 V8', time: 'Đã xem 2 giờ trước', image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop' },
            { id: 11, name: 'BMW M4 Competition', engine: '3.0 L6', time: 'Đã xem 5 giờ trước', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop' },
            { id: 12, name: 'Bentley Bentayga V8', engine: '4.0 V8', time: 'Đã xem hôm qua', image: 'https://images.unsplash.com/photo-1627916323114-f421f1e2fbc0?q=80&w=600&auto=format&fit=crop' },
            { id: 13, name: 'Lexus LX600 VIP', engine: '3.5 V6', time: 'Đã xem 2 ngày trước', image: 'https://images.unsplash.com/photo-1619682817481-e994891cb1b4?q=80&w=600&auto=format&fit=crop' },
        ];

        const mockBrands = [
            'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Range Rover', 'Lexus'
        ];

        setFeaturedCars(mockFeaturedCars);
        setRecentHistory(mockRecentHistory);
        setBrands(mockBrands);
    }, []);

    // Handlers
    const handleBookService = () => console.log('Booking Service Clicked');
    const handleViewCars = () => console.log('Viewing Cars Clicked');
    const handleTradeIn = () => console.log('Trade-in Clicked');

    return {
        featuredCars,
        recentHistory,
        brands,
        handleBookService,
        handleViewCars,
        handleTradeIn
    };
};
