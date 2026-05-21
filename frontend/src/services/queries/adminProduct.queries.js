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
        mutationFn: ({ id, data }) => {
            console.log('useUpdateAdminProductMutation mutationFn triggered', { id });
            return updateAdminProduct(id, data);
        },
        onSuccess: (data) => {
            console.log('useUpdateAdminProductMutation onSuccess triggered', data);
            try {
                queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
                console.log('useUpdateAdminProductMutation query invalidation done');
            } catch (err) {
                console.error('useUpdateAdminProductMutation query invalidation failed', err);
            }
        },
        onError: (error) => {
            console.error('useUpdateAdminProductMutation onError triggered', error);
        }
    });
};

export const useCreateAdminProductMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            console.log('useCreateAdminProductMutation mutationFn triggered');
            return createAdminProduct(data);
        },
        onSuccess: (data) => {
            console.log('useCreateAdminProductMutation onSuccess triggered', data);
            try {
                queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
                console.log('useCreateAdminProductMutation query invalidation done');
            } catch (err) {
                console.error('useCreateAdminProductMutation query invalidation failed', err);
            }
        },
        onError: (error) => {
            console.error('useCreateAdminProductMutation onError triggered', error);
        }
    });
};
