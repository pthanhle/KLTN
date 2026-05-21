import { useState, useEffect, useMemo } from 'react';
import { CategoryAPI } from '../../../../services/api/category';

export const useCategoriesData = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await CategoryAPI.getAdminCategories({ all: true });
            setCategories(response.categories || []);
        } catch (error) {
            console.error('Lỗi khi tải danh sách kiểu dáng:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const stats = useMemo(() => {
        const totalCategories = categories.length;
        const totalCars = categories.reduce((sum, item) => sum + (item.count || 0), 0);
        const activeCategories = categories.filter(item => (item.count || 0) > 0).length;

        let mostPopular = 'N/A';
        if (totalCategories > 0) {
            const top = categories.reduce((prev, current) => ((prev.count || 0) > (current.count || 0)) ? prev : current);
            mostPopular = top.category_name || top.name || 'N/A';
        }

        return {
            totalCategories,
            activeCategories,
            totalCars,
            mostPopular
        };
    }, [categories]);

    return {
        categories,
        setCategories,
        stats,
        isLoading,
        reloadCategories: fetchCategories
    };
};
