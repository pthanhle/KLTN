import { useMemo } from 'react';
import { useAdminBrandsQuery } from '../../../../services/queries/brandQueries';

export const useBrandsData = () => {
    const { data: brands = [], isLoading } = useAdminBrandsQuery();

    const stats = useMemo(() => {
        const total = brands.length;
        const totalProducts = brands.reduce((sum, b) => sum + (b.count || 0), 0);
        const hotBrand = brands.length > 0 ? [...brands].sort((a,b) => b.count - a.count)[0].name : '--';
        return { total, totalProducts, hotBrand };
    }, [brands]);

    return {
        brands,
        isLoading,
        stats
    };
};

