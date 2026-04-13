import { useState, useEffect } from 'react';
import { FUEL_TYPES_MOCK, MOCK_API_DELAY } from '../data/carSpecs.mock';

export const useCarSpecsEnums = () => {
    const [fuelTypes, setFuelTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        
        const fetchEnums = async () => {
            try {
                setIsLoading(true);
                // Simulate API Call
                await new Promise(resolve => setTimeout(resolve, MOCK_API_DELAY));
                
                if (isMounted) {
                    setFuelTypes(FUEL_TYPES_MOCK);
                }
            } catch (error) {
                console.error("Failed to fetch car spec enums:", error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchEnums();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        fuelTypes,
        isLoading
    };
};
