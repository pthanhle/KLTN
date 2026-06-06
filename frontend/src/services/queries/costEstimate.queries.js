import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClientCostEstimateConfig, getAdminCostEstimateConfig, updateAdminCostEstimateConfig } from '../api/costEstimate.api';

const COST_ESTIMATE_KEY = ['cost-estimate-config'];

export const useClientCostEstimateQuery = (enabled = false) => {
    return useQuery({
        queryKey: COST_ESTIMATE_KEY,
        queryFn: getClientCostEstimateConfig,
        staleTime: 10 * 60 * 1000,
        enabled,
    });
};

export const useAdminCostEstimateQuery = () => {
    return useQuery({
        queryKey: [...COST_ESTIMATE_KEY, 'admin'],
        queryFn: getAdminCostEstimateConfig,
        staleTime: 5 * 60 * 1000,
    });
};

export const useUpdateCostEstimateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAdminCostEstimateConfig,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: COST_ESTIMATE_KEY });
        },
    });
};
