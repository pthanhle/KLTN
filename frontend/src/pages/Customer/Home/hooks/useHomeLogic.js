import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_FEATURED_CARS, MOCK_RECENT_HISTORY, MOCK_BRANDS_LIST } from '../data/home.mock';

export const useHomeLogic = () => {
    const navigate = useNavigate();

    const [featuredCars, setFeaturedCars] = useState([]);
    const [recentHistory, setRecentHistory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setFeaturedCars(MOCK_FEATURED_CARS);
        setRecentHistory(MOCK_RECENT_HISTORY);
        setBrands(MOCK_BRANDS_LIST);
        setIsLoading(false);
    }, []);

    // Handlers
    const handleBookService = () => navigate('/services');
    const handleViewCars = () => navigate('/products');
    const handleViewCarDetail = (id) => navigate(`/cars/${id}`);
    const handleTradeIn = () => navigate('/contact');

    return {
        featuredCars,
        recentHistory,
        brands,
        handleBookService,
        handleViewCars,
        handleViewCarDetail,
        handleTradeIn,
        isLoading
    };
};
