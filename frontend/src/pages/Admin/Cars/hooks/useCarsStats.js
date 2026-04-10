import { useState, useEffect } from 'react';
import { MOCK_CARS_STATS } from '../data/carsStats.mock';

export const useCarsStats = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                setStats(MOCK_CARS_STATS);
            } catch (error) {
                console.error("Error fetching car stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return {
        stats,
        isLoading
    };
};
