import { useEffect } from 'react';
import { useQuery, useMutation, keepPreviousData, useQueryClient } from '@tanstack/react-query';
import { clientPartApi } from '../api/clientPart.api';

export const useClientPartsData = (params) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const bc = new BroadcastChannel('kltn_sync_channel');
        bc.onmessage = (event) => {
            if (event.data?.type === 'PARTS_UPDATED') {
                queryClient.invalidateQueries({ queryKey: ['clientParts'] });
                queryClient.invalidateQueries({ queryKey: ['clientPart'] });
            } else if (event.data?.type === 'FILTERS_UPDATED') {
                queryClient.invalidateQueries({ queryKey: ['partFilters'] });
            }
        };
        return () => bc.close();
    }, [queryClient]);

    const partsQuery = useQuery({
        queryKey: ['clientParts', params],
        queryFn: () => clientPartApi.getActiveParts(params),
        placeholderData: keepPreviousData,
        staleTime: 10 * 1000,
    });

    const filtersQuery = useQuery({
        queryKey: ['partFilters'],
        queryFn: async () => {
            const [catRes, brandRes] = await Promise.all([
                clientPartApi.getCategories(),
                clientPartApi.getBrands()
            ]);
            return {
                categories: catRes.map(category => ({
                    id: category.value,
                    value: category.value,
                    name: category.name,
                    image: category.image || null
                })),
                brands: brandRes.map(brand => ({
                    id: brand.name,
                    name: brand.name,
                    logo: brand.logo || null
                }))
            };
        },
        staleTime: 60 * 60 * 1000,
    });

    return {
        parts: partsQuery.data?.data?.parts || [],
        pagination: partsQuery.data?.data?.pagination || null,
        isLoadingParts: partsQuery.isLoading,
        isFetchingParts: partsQuery.isFetching,
        categories: filtersQuery.data?.categories || [],
        brands: filtersQuery.data?.brands || [],
        isLoadingFilters: filtersQuery.isLoading,
    };
};

export const useClientSinglePartData = (slug) => {
    return useQuery({
        queryKey: ['clientPart', slug],
        queryFn: () => clientPartApi.getPartBySlug(slug),
        enabled: !!slug,
        staleTime: 10 * 1000,
    });
};

export const useSubmitPartReviewMutation = () => {
    return useMutation({
        mutationFn: (reviewData) => clientPartApi.submitPartReview(reviewData),
    });
};

export const useLikePartReviewMutation = () => {
    return useMutation({
        mutationFn: (reviewId) => clientPartApi.likePartReview(reviewId),
    });
};

export const useReplyPartReviewMutation = () => {
    return useMutation({
        mutationFn: ({ reviewId, content }) => clientPartApi.replyPartReview(reviewId, content),
    });
};

export const useDeletePartReviewMutation = () => {
    return useMutation({
        mutationFn: (reviewId) => clientPartApi.deletePartReview(reviewId),
    });
};

export const useDeletePartReviewReplyMutation = () => {
    return useMutation({
        mutationFn: ({ reviewId, replyId }) => clientPartApi.deletePartReviewReply(reviewId, replyId),
    });
};

export const useEditPartReviewMutation = () => {
    return useMutation({
        mutationFn: ({ reviewId, data }) => clientPartApi.editPartReview(reviewId, data),
    });
};

export const useEditPartReviewReplyMutation = () => {
    return useMutation({
        mutationFn: ({ reviewId, replyId, content }) => clientPartApi.editPartReviewReply(reviewId, replyId, content),
    });
};
