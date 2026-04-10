import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_FEATURED_CARS, MOCK_RECENT_HISTORY } from '../data/home.mock';
import { useClientBrandsQuery } from '../../../../services/queries/brandQueries';

export const useHomeLogic = () => {
    const navigate = useNavigate();

    const [featuredCars, setFeaturedCars] = useState([]);
    const [recentHistory, setRecentHistory] = useState([]);

    const { data: brands = [], isLoading: isBrandsLoading } = useClientBrandsQuery(true);
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        setFeaturedCars(MOCK_FEATURED_CARS);
        setRecentHistory(MOCK_RECENT_HISTORY);
        setIsDataReady(true);
    }, []);

    const handleBookService = () => navigate('/services');
    const handleViewCars = () => navigate('/brands');
    const handleViewCarDetail = (id) => navigate(`/cars/${id}`);
    const handleTradeIn = () => navigate('/contact');
    const handleViewBrand = (brandId) => navigate(`/cars?brand=${brandId}`);

    return {
        featuredCars,
        recentHistory,
        brands,
        handleBookService,
        handleViewCars,
        handleViewCarDetail,
        handleTradeIn,
        handleViewBrand,
        isLoading: !isDataReady || isBrandsLoading
    };
};
