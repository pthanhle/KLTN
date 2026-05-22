import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useClientBrandsQuery } from '../../../../services/queries/brandQueries';
import { useFeaturedProductsQuery } from '../../../../services/queries/clientProduct.queries';

export const useHomeLogic = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('layout');

    const [recentHistory, setRecentHistory] = useState([]);

    const { data: brands = [], isLoading: isBrandsLoading } = useClientBrandsQuery(true);
    const { data: featuredResponse, isLoading: isFeaturedLoading } = useFeaturedProductsQuery();
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('recent_cars_history');
            if (storedHistory) {
                const historyList = JSON.parse(storedHistory);
                const formattedHistory = historyList.map(item => {
                    let timeStr = t('notifications.time.just_now', 'Vừa xong');
                    if (item.viewedAt) {
                        const diffMs = Date.now() - item.viewedAt;
                        const diffMins = Math.floor(diffMs / (60 * 1000));
                        if (diffMins >= 1 && diffMins < 60) {
                            timeStr = t('notifications.time.minutes_ago', { count: diffMins }) || `${diffMins} phút trước`;
                        } else if (diffMins >= 60) {
                            const diffHours = Math.floor(diffMins / 60);
                            if (diffHours < 24) {
                                timeStr = t('notifications.time.hours_ago', { count: diffHours }) || `${diffHours} giờ trước`;
                            } else {
                                const diffDays = Math.floor(diffHours / 24);
                                timeStr = t('notifications.time.days_ago', { count: diffDays }) || `${diffDays} ngày trước`;
                            }
                        }
                    }
                    return {
                        ...item,
                        time: timeStr
                    };
                });
                setRecentHistory(formattedHistory);
            }
        } catch (err) {
            console.error('Failed to load recent history from localStorage:', err);
        }
        setIsDataReady(true);
    }, [t]);

    const handleBookService = () => navigate('/services');
    const handleViewCars = () => navigate('/brands');
    const handleViewCarDetail = (id) => navigate(`/cars/${id}`);
    const handleTradeIn = () => navigate('/contact');
    const handleViewBrand = (brandId) => navigate(`/cars?brand=${brandId}`);

    const rawFeaturedCars = featuredResponse?.data || [];
    const featuredCars = rawFeaturedCars.map(car => ({
        ...car,
        subtitle: `${car.brandName || ''} • ${car.engine || ''} • ${car.bodyStyle || ''}`
    }));

    return {
        featuredCars,
        recentHistory,
        brands,
        handleBookService,
        handleViewCars,
        handleViewCarDetail,
        handleTradeIn,
        handleViewBrand,
        isLoading: !isDataReady || isBrandsLoading || isFeaturedLoading
    };
};

