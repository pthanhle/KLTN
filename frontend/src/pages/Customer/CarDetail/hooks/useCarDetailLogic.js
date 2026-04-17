import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getClientProductById } from '../../../../services/api/clientProduct.api';

export const useCarDetailLogic = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [car, setCar] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        const fetchCarDetail = async () => {
            try {
                // If it's a slug or ID, the backend supports both
                const fetchedCar = await getClientProductById(id);
                if (isMounted) {
                    setCar(fetchedCar);
                    if (fetchedCar.colors && fetchedCar.colors.length > 0) {
                        setSelectedColor(fetchedCar.colors[0]);
                    }
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch car detail:", error);
                if (isMounted) setIsLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchCarDetail();
        }, 500);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [id]);

    return {
        isLoading,
        car,
        selectedColor,
        setSelectedColor
    };
};
