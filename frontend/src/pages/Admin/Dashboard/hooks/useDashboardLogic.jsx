import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../../../../utils/axiosClient';
import dayjs from 'dayjs';

export const useDashboardLogic = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchStats = useCallback(async (showRefreshing = false) => {
        if (showRefreshing) setRefreshing(true);
        else setLoading(true);
        
        try {
            const res = await axiosClient.get('/admin/dashboard');
            setStats(res);
            setLastUpdated(new Date());
        } catch (error) {
            console.error('Failed to fetch dashboard stats', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const hour = dayjs().hour();
    let greetingKey = 'greeting_morning';
    if (hour >= 12 && hour < 18) greetingKey = 'greeting_afternoon';
    else if (hour >= 18) greetingKey = 'greeting_evening';

    return {
        stats,
        loading,
        lastUpdated,
        refreshing,
        fetchStats,
        greetingKey
    };
};
