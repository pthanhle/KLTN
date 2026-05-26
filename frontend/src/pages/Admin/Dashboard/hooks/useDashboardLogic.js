import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDashboardStats } from '../../../../services/queries/adminDashboard.queries';
import dayjs from 'dayjs';

export const useDashboardLogic = () => {
    const { t } = useTranslation('adminDashboard');
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const { 
        data: stats, 
        isLoading, 
        isFetching, 
        refetch 
    } = useDashboardStats({
        onSuccess: () => {
            setLastUpdated(new Date());
        }
    });

    const handleRefresh = async () => {
        await refetch();
        setLastUpdated(new Date());
    };

    const hour = dayjs().hour();
    let greetingKey = 'greeting_morning';
    if (hour >= 12 && hour < 18) greetingKey = 'greeting_afternoon';
    else if (hour >= 18) greetingKey = 'greeting_evening';

    return {
        stats,
        isLoading,
        isFetching,
        lastUpdated,
        handleRefresh,
        greetingKey,
        t
    };
};
