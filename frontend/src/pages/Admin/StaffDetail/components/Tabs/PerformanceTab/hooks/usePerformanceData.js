import { useState, useEffect } from 'react';
import { getStaffPerformance } from '../data/mockPerformanceData';

export const usePerformanceData = (staffId, dateRange = 'this_month') => {
    const [performanceData, setPerformanceData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        const fetchPerformance = async () => {
            try {
                // Tương lai thay bằng: await axios.get(`/api/v1/staff/${staffId}/performance?period=${dateRange}`)
                await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network latency

                const data = getStaffPerformance(staffId);
                
                if (isMounted) {
                    setPerformanceData(data);
                }
            } catch (err) {
                if (isMounted) setError('Failed to fetch performance data');
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        if (staffId) {
            fetchPerformance();
        }

        return () => {
            isMounted = false;
        };
    }, [staffId, dateRange]); // Refetch when dateRange changes

    return {
        performanceData,
        isLoading,
        error
    };
};
