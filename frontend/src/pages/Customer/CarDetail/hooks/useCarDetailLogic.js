import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useClientProductDetailQuery } from '../../../../services/queries/clientProduct.queries';

export const useCarDetailLogic = () => {
    const { id } = useParams();
    const [selectedColor, setSelectedColor] = useState(null);

    const { data: car, isLoading } = useClientProductDetailQuery(id);

    useEffect(() => {
        if (car && car.colors && car.colors.length > 0 && !selectedColor) {
            setSelectedColor(car.colors[0]);
        }
    }, [car, selectedColor]);

    useEffect(() => {
        if (car && (car.id || car._id)) {
            try {
                const carId = car.id || car._id;
                const storedHistory = localStorage.getItem('recent_cars_history');
                let historyList = storedHistory ? JSON.parse(storedHistory) : [];

                historyList = historyList.filter(item => item.id !== carId);

                const historyItem = {
                    id: carId,
                    name: car.name,
                    brandName: car.brandName,
                    bodyStyle: car.bodyStyle,
                    engine: car.engine,
                    image: car.image,
                    price: car.price,
                    salePrice: car.salePrice,
                    isNew: car.isNew,
                    viewedAt: Date.now()
                };
                historyList.unshift(historyItem);

                historyList = historyList.slice(0, 8);

                localStorage.setItem('recent_cars_history', JSON.stringify(historyList));
            } catch (err) {
                console.error('Error saving to local storage history:', err);
            }
        }
    }, [car]);

    return {
        isLoading,
        car,
        selectedColor,
        setSelectedColor
    };
};

