import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMockCarDetail } from '../data/carDetail.mock';

export const useCarDetailLogic = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [car, setCar] = useState(null);

    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            const fetchedCar = getMockCarDetail(id);
            setCar(fetchedCar);
            if (fetchedCar.colors && fetchedCar.colors.length > 0) {
                setSelectedColor(fetchedCar.colors[0]);
            }
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [id]);

    return {
        isLoading,
        car,
        selectedColor,
        setSelectedColor
    };
};
