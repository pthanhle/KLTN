import { useMemo, useState, useEffect } from 'react';
import { mockServices } from '../data/mockServiceData';
import { useTranslation } from 'react-i18next';

export const useServiceHistoryLogic = () => {
    const { t } = useTranslation('profile');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);
    // Ở đây sắp tới sẽ kết nối API thay vì trả data tĩnh
    const servicesData = useMemo(() => {
        return mockServices;
    }, []);

    // Tìm lịch sử gần nhất có khuyến cáo ODO
    const nextRecommendedDate = "20/05/2026";

    return {
        t,
        servicesData,
        nextRecommendedDate,
        isLoading
    };
};
