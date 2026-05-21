import { useState, useEffect } from 'react';
import { brandAPI } from '../../../../services/api/brands';
import { CategoryAPI } from '../../../../services/api/category';

export const useDynamicTaxonomies = () => {
    const [brands, setBrands] = useState([]);
    const [bodyStyles, setBodyStyles] = useState([]);
    const [isLoadingTaxonomies, setIsLoadingTaxonomies] = useState(true);

    useEffect(() => {
        const fetchTaxonomies = async () => {
            setIsLoadingTaxonomies(true);
            try {
                const brandsData = await brandAPI.getAdminBrands();
                const formattedBrands = brandsData.map(b => ({
                    value: b.id || b._id,
                    label: b.name
                }));

                const categoriesRes = await CategoryAPI.getAdminCategories({ all: true });
                const categoriesData = categoriesRes.categories || [];
                const formattedStyles = categoriesData.map(c => ({
                    value: c.category_name,
                    label: c.category_name
                }));

                setBrands(formattedBrands);
                setBodyStyles(formattedStyles);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu Thương hiệu/Kiểu dáng:', error);
            } finally {
                setIsLoadingTaxonomies(false);
            }
        };

        fetchTaxonomies();
    }, []);

    return { brands, bodyStyles, isLoadingTaxonomies };
};
