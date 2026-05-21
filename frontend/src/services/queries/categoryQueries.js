import { useQuery } from '@tanstack/react-query';
import { CategoryAPI } from '../api/category';

export const useClientCategoriesQuery = () => {
    return useQuery({
        queryKey: ['client_categories'],
        queryFn: async () => {
            const res = await CategoryAPI.getCategoryList({ all: true });
            return res.categories || [];
        },
        staleTime: 10 * 60 * 100
    });
};
