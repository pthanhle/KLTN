import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { brandAPI } from '../api/brands';

export const useAdminBrandsQuery = () => {
    return useQuery({
        queryKey: ['admin_brands'],
        queryFn: async () => {
            const data = await brandAPI.getAdminBrands();
            return data.map(b => ({
                id: b._id,
                name: b.name,
                image: b.image,
                is_partner: b.is_partner,
                count: b.count || 0
            }));
        },
        staleTime: 5 * 60 * 1000 // Cache 5 mins
    });
};

export const useClientBrandsQuery = (isPartner) => {
    return useQuery({
        queryKey: ['client_brands', { isPartner }],
        queryFn: async () => {
            const data = await brandAPI.getClientBrands(isPartner);
            return data.map(b => ({
                id: b._id,
                name: b.name,
                image: b.image,
                is_partner: b.is_partner,
                count: b.count || 0
            }));
        },
        staleTime: 10 * 60 * 1000 // Cache 10 mins
    });
};

export const useAdminBrandsMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: brandAPI.createBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_brands'] });
            queryClient.invalidateQueries({ queryKey: ['client_brands'] });
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => brandAPI.updateBrand(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_brands'] });
            queryClient.invalidateQueries({ queryKey: ['client_brands'] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: brandAPI.deleteBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_brands'] });
            queryClient.invalidateQueries({ queryKey: ['client_brands'] });
        }
    });

    return {
        createBrand: createMutation.mutateAsync,
        updateBrand: updateMutation.mutateAsync,
        deleteBrand: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending
    };
};
