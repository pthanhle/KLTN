import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceCategoryAPI } from '../api/serviceCategories.api';

export const useAdminServiceCategoriesQuery = (params) => {
    return useQuery({
        queryKey: ['adminServiceCategories', params],
        queryFn: async () => {
            const data = await serviceCategoryAPI.getAdminServiceCategories(params);
            return data;
        },
    });
};

export const useAdminServiceCategoryMutations = () => {
    const queryClient = useQueryClient();

    const invalidateQueries = () => {
        queryClient.invalidateQueries(['adminServiceCategories']);
        queryClient.invalidateQueries(['clientServiceCategories']);
    };

    const createServiceCategory = useMutation({
        mutationFn: serviceCategoryAPI.createServiceCategory,
        onSuccess: invalidateQueries,
    });

    const updateServiceCategory = useMutation({
        mutationFn: ({ id, data }) => serviceCategoryAPI.updateServiceCategory(id, data),
        onSuccess: invalidateQueries,
    });

    const deleteServiceCategory = useMutation({
        mutationFn: serviceCategoryAPI.deleteServiceCategory,
        onSuccess: invalidateQueries,
    });

    const toggleStatus = useMutation({
        mutationFn: serviceCategoryAPI.toggleServiceCategoryStatus,
        onSuccess: invalidateQueries,
    });

    return {
        createServiceCategory: createServiceCategory.mutateAsync,
        updateServiceCategory: updateServiceCategory.mutateAsync,
        deleteServiceCategory: deleteServiceCategory.mutateAsync,
        toggleStatus: toggleStatus.mutateAsync,
        isCreating: createServiceCategory.isLoading,
        isUpdating: updateServiceCategory.isLoading,
        isDeleting: deleteServiceCategory.isLoading,
        isToggling: toggleStatus.isLoading,
    };
};

// CLIENT QUERIES
export const useClientServiceCategoriesQuery = () => {
    return useQuery({
        queryKey: ['clientServiceCategories'],
        queryFn: async () => {
            const data = await serviceCategoryAPI.getClientServiceCategories();
            return data;
        },
    });
};
