import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useCarsURLSync = (setFilters, setSort) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateURL = (newFilters, newSort) => {
        const params = new URLSearchParams();
        if (newFilters.keyword) params.set('keyword', newFilters.keyword);
        if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
        if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
        if (newFilters.bodyStyle && newFilters.bodyStyle !== 'Tất cả') params.set('bodyStyle', newFilters.bodyStyle);
        if (newSort && newSort !== 'newest') params.set('sort', newSort);
        
        newFilters.brandSlugs.forEach(slug => {
            params.append('brand', slug);
        });

        setSearchParams(params, { replace: true });
    };

    useEffect(() => {
        setFilters({
            keyword: searchParams.get('keyword') || '',
            brandSlugs: searchParams.getAll('brand'),
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            bodyStyle: searchParams.get('bodyStyle') || 'Tất cả'
        });
        setSort(searchParams.get('sort') || 'newest');
    }, [searchParams, setFilters, setSort]);

    return { searchParams, updateURL };
};
