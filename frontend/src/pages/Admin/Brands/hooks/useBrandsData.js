import { useState, useEffect, useMemo } from 'react';
import { MOCK_BRANDS_ADMIN } from '../data/brand.mock';

export const useBrandsData = () => {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 600));
                setBrands(MOCK_BRANDS_ADMIN);
            } catch (error) {
                console.error("Failed to load brands:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBrands();
    }, []);

    const stats = useMemo(() => {
        const total = brands.length;
        const totalProducts = brands.reduce((sum, b) => sum + (b.count || 0), 0);
        const hotBrand = brands.length > 0 ? [...brands].sort((a,b) => b.count - a.count)[0].name : '--';
        return { total, totalProducts, hotBrand };
    }, [brands]);

    return {
        brands,
        setBrands,
        isLoading,
        stats
    };
};
