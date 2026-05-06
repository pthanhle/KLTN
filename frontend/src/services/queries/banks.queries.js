import { useQuery } from '@tanstack/react-query';
import { fetchBanks } from '../api/banks.api';

export const useBanks = () => {
    return useQuery({
        queryKey: ['vietnam_banks'],
        queryFn: fetchBanks,
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: 2,
    });
};
