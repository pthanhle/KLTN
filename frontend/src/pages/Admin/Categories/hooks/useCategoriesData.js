import { useState, useEffect, useMemo } from 'react';
import { MOCK_CATEGORIES_ADMIN } from '../data/category.mock';

export const useCategoriesData = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Giả lập API Fetch
        const fetchCategories = async () => {
            setIsLoading(true);
            setTimeout(() => {
                setCategories(MOCK_CATEGORIES_ADMIN);
                setIsLoading(false);
            }, 800);
        };
        fetchCategories();
    }, []);

    const stats = useMemo(() => {
        const totalCategories = categories.length;
        const totalCars = categories.reduce((sum, item) => sum + item.count, 0);

        let mostPopular = 'N/A';
        if (totalCategories > 0) {
            const top = categories.reduce((prev, current) => (prev.count > current.count) ? prev : current);
            mostPopular = top.name;
        }

        return {
            totalCategories,
            totalCars,
            mostPopular
        };
    }, [categories]);

    return {
        categories,
        setCategories,
        stats,
        isLoading
    };
};
