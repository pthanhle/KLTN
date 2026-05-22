import { useQuery } from '@tanstack/react-query';
import { getClientProducts, getClientProductById, getFeaturedProducts } from '../api/clientProduct.api';

export const productKeys = {
    all: ['client-products'],
    lists: () => [...productKeys.all, 'list'],
    list: (filters) => [...productKeys.lists(), filters],
    details: () => [...productKeys.all, 'detail'],
    detail: (id) => [...productKeys.details(), id],
};

export const useClientProductsQuery = (params) => {
    return useQuery({
        queryKey: productKeys.list(params),
        queryFn: () => getClientProducts(params),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useClientProductDetailQuery = (id) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => getClientProductById(id),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
};

export const useFeaturedProductsQuery = () => {
    return useQuery({
        queryKey: [...productKeys.all, 'featured'],
        queryFn: () => getFeaturedProducts(),
        staleTime: 5 * 60 * 1000,
    });
};

