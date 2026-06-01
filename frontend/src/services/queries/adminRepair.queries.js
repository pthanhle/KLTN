import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminRepairAPI } from '../api/adminRepair.api';

export const useAdminRepairProgresses = (params) => {
    return useQuery({
        queryKey: ['adminRepairProgresses', params],
        queryFn: () => AdminRepairAPI.getRepairProgresses(params),
        keepPreviousData: true,
    });
};

export const useAdminRepairProgressById = (id) => {
    return useQuery({
        queryKey: ['adminRepairProgress', id],
        queryFn: () => AdminRepairAPI.getRepairProgressById(id),
        enabled: !!id,
    });
};

export const useAdminProcessReception = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => AdminRepairAPI.processReception(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgresses'] });
        },
    });
};

export const useAdminUpdateDiagnostics = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => AdminRepairAPI.updateDiagnostics(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgress', variables.progress_id] });
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgresses'] });
        },
    });
};

export const useAdminCreateQuotation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => AdminRepairAPI.createQuotation(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgress', variables.progress_id] });
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgresses'] });
        },
    });
};

export const useAdminApproveQuotation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => AdminRepairAPI.approveQuotation(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgress', variables.progress_id] });
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgresses'] });
        },
    });
};

export const useAdminUpdateQC = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => AdminRepairAPI.updateQC(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgress', variables.progress_id] });
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgresses'] });
        },
    });
};

export const useAdminProcessHandover = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload) => AdminRepairAPI.processHandover(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgress', variables.progress_id] });
            queryClient.invalidateQueries({ queryKey: ['adminRepairProgresses'] });
        },
    });
};
