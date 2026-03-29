import { useState, useEffect } from 'react';
import { getProgressData } from '../data/mockProgressData';
import { useParams } from 'react-router-dom';

export const useProgressTabLogic = () => {
    const { id } = useParams();
    const [progressData, setProgressData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            setIsLoading(true);
            try {
                // Simulate network latency
                await new Promise(res => setTimeout(res, 800));
                const data = getProgressData(id || 'SRV-1234');
                setProgressData(data);
            } catch (error) {
                console.error("Failed to load progress data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProgress();
    }, [id]);

    return {
        progressData,
        isLoading
    };
};
