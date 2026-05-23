import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import loyaltyApi from '../api/loyalty.api';
import { profileApi } from '../api/profile.api';

export const useLoyaltyProfileQuery = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: () => profileApi.getProfile(),
        staleTime: 60000,
        select: (data) => data?.data || data
    });
};

export const useLoyaltyHistoryQuery = () => {
    return useQuery({
        queryKey: ['loyaltyHistory'],
        queryFn: () => loyaltyApi.getHistory(),
        staleTime: 60000,
        select: (data) => Array.isArray(data) ? data : (data?.data || [])
    });
};  

export const useLoyaltyStoreQuery = () => {
    return useQuery({
        queryKey: ['loyaltyStoreVouchers'],
        queryFn: () => loyaltyApi.getAvailableVouchers(),
        staleTime: 60000,
        select: (data) => Array.isArray(data) ? data : (data?.data || [])
    });
};

export const useMyVouchersQuery = () => {
    return useQuery({
        queryKey: ['myLoyaltyVouchers'],
        queryFn: () => loyaltyApi.getMyVouchers(),
        staleTime: 60000,
        select: (data) => Array.isArray(data) ? data : (data?.data || [])
    });
};

export const useVoucherRedeem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (promotionId) => loyaltyApi.redeemVoucher(promotionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            queryClient.invalidateQueries({ queryKey: ['loyaltyHistory'] });
            queryClient.invalidateQueries({ queryKey: ['myLoyaltyVouchers'] });
            queryClient.invalidateQueries({ queryKey: ['loyaltyStoreVouchers'] });
        }
    });
};
