import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useClientProductDetailQuery } from '../../../../services/queries/clientProduct.queries';

export const useCarDetailLogic = () => {
    const { id } = useParams();
    const [selectedColor, setSelectedColor] = useState(null);

    const { data: car, isLoading } = useClientProductDetailQuery(id);

    // Initialize selected color once car data is loaded
    useEffect(() => {
        if (car && car.colors && car.colors.length > 0 && !selectedColor) {
            setSelectedColor(car.colors[0]);
        }
    }, [car, selectedColor]);

    return {
        isLoading,
        car,
        selectedColor,
        setSelectedColor
    };
};
