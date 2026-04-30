import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceItemAPI } from '../api/serviceItems.api';

export const useAdminServiceItemsQuery = (params) => {
    return useQuery({
        queryKey: ['adminServiceItems', params],
        queryFn: async () => {
            const data = await serviceItemAPI.getAdminServiceItems(params);
            return data;
        },
        keepPreviousData: true,
    });
};

export const useAdminServiceItemsMutations = () => {
    const queryClient = useQueryClient();

    const invalidateQueries = () => {
        queryClient.invalidateQueries(['adminServiceItems']);
        queryClient.invalidateQueries(['clientServiceItems']);
    };

    const createServiceItem = useMutation({
        mutationFn: serviceItemAPI.createServiceItem,
        onSuccess: invalidateQueries,
    });

    const updateServiceItem = useMutation({
        mutationFn: ({ id, data }) => serviceItemAPI.updateServiceItem(id, data),
        onSuccess: invalidateQueries,
    });

    const deleteServiceItem = useMutation({
        mutationFn: serviceItemAPI.deleteServiceItem,
        onSuccess: invalidateQueries,
    });

    const toggleStatus = useMutation({
        mutationFn: serviceItemAPI.toggleServiceItemStatus,
        onSuccess: invalidateQueries,
    });

    return {
        createServiceItem: createServiceItem.mutateAsync,
        updateServiceItem: updateServiceItem.mutateAsync,
        deleteServiceItem: deleteServiceItem.mutateAsync,
        toggleStatus: toggleStatus.mutateAsync,
        isCreating: createServiceItem.isLoading,
        isUpdating: updateServiceItem.isLoading,
        isDeleting: deleteServiceItem.isLoading,
        isToggling: toggleStatus.isLoading,
    };
};

export const useClientServiceItemsQuery = (params) => {
    return useQuery({
        queryKey: ['clientServiceItems', params],
        queryFn: async () => {
            const data = await serviceItemAPI.getClientServiceItems(params);
            return data;
        },
    });
};

