import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAdminProducts, updateAdminProduct, getAdminProductById, createAdminProduct } from '../api/adminProduct.api';

export const adminProductKeys = {
    all: ['admin-products'],
    lists: () => [...adminProductKeys.all, 'list'],
    list: (filters) => [...adminProductKeys.lists(), filters],
    details: () => [...adminProductKeys.all, 'detail'],
    detail: (id) => [...adminProductKeys.details(), id],
};

export const useAdminProductsQuery = (params) => {
    return useQuery({
        queryKey: adminProductKeys.list(params),
        queryFn: () => getAdminProducts(params),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });
};

export const useAdminProductDetailQuery = (id) => {
    return useQuery({
        queryKey: adminProductKeys.detail(id),
        queryFn: () => getAdminProductById(id),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
};

export const useUpdateAdminProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateAdminProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
        }
    });
};

export const useCreateAdminProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => createAdminProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
        }
    });
};
