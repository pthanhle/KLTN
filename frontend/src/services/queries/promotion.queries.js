import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { promotionAPI } from '../api/promotion.api';

// ─── Query Keys ──────────────────────────────────────────────────────────────
export const PROMOTION_KEYS = {
    all: ['promotions'],
    adminList: (params) => ['promotions', 'admin', 'list', params],
    adminStats: () => ['promotions', 'admin', 'stats'],
    adminDetail: (id) => ['promotions', 'admin', 'detail', id],
    clientList: (params) => ['promotions', 'client', 'list', params],
    clientDetail: (id) => ['promotions', 'client', 'detail', id],
};

// ─── Admin Queries ────────────────────────────────────────────────────────────

export const useAdminPromotionsQuery = (params = {}) => {
    return useQuery({
        queryKey: PROMOTION_KEYS.adminList(params),
        queryFn: () => promotionAPI.getAdminPromotions(params),
        staleTime: 2 * 60 * 1000,
    });
};

export const useAdminPromotionStatsQuery = () => {
    return useQuery({
        queryKey: PROMOTION_KEYS.adminStats(),
        queryFn: () => promotionAPI.getAdminPromotionStats(),
        staleTime: 5 * 60 * 1000,
    });
};

export const useAdminPromotionDetailQuery = (id) => {
    return useQuery({
        queryKey: PROMOTION_KEYS.adminDetail(id),
        queryFn: () => promotionAPI.getAdminPromotionById(id),
        enabled: !!id,
        staleTime: 2 * 60 * 1000,
    });
};

// ─── Admin Mutations ──────────────────────────────────────────────────────────

export const useAdminPromotionMutations = () => {
    const queryClient = useQueryClient();

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: PROMOTION_KEYS.all });
    };

    const createMutation = useMutation({
        mutationFn: (data) => promotionAPI.createPromotion(data),
        onSuccess: invalidate,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => promotionAPI.updatePromotion(id, data),
        onSuccess: invalidate,
    });

    const toggleStatusMutation = useMutation({
        mutationFn: (id) => promotionAPI.togglePromotionStatus(id),
        onSuccess: invalidate,
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => promotionAPI.deletePromotion(id),
        onSuccess: invalidate,
    });

    return {
        createPromotion: createMutation.mutateAsync,
        updatePromotion: updateMutation.mutateAsync,
        toggleStatus: toggleStatusMutation.mutateAsync,
        deletePromotion: deleteMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isTogglingStatus: toggleStatusMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};

// ─── Client Queries ───────────────────────────────────────────────────────────

export const useClientPromotionsQuery = (params = {}) => {
    return useQuery({
        queryKey: PROMOTION_KEYS.clientList(params),
        queryFn: () => promotionAPI.getActivePromotions(params),
        staleTime: 5 * 60 * 1000,
    });
};

export const useClientPromotionDetailQuery = (id) => {
    return useQuery({
        queryKey: PROMOTION_KEYS.clientDetail(id),
        queryFn: () => promotionAPI.getPromotionDetail(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
};
