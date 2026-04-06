import { useQuery } from '@tanstack/react-query';
import { partsApi } from '../data/partsMockApi';

export const usePartsData = () => {
    const partsQuery = useQuery({
        queryKey: ['admin_parts'],
        queryFn: partsApi.getAllParts,
        staleTime: 5 * 60 * 1000
    });

    const filtersQuery = useQuery({
        queryKey: ['admin_parts_filters'],
        queryFn: partsApi.getFiltersData,
        staleTime: Infinity
    });

    return {
        parts: partsQuery.data || [],
        isLoadingParts: partsQuery.isLoading,
        categories: filtersQuery.data?.categories || [],
        brands: filtersQuery.data?.brands || [],
        isLoadingFilters: filtersQuery.isLoading
    };
};
