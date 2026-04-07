import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { adminPartApi } from '../api/adminPart.api';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------
// HOOKS CHO BẢNG DANH SÁCH (PARTS INDEX)
// ----------------------------------------

export const useAdminPartsData = (queryParams = {}) => {
    const partsQuery = useQuery({
        queryKey: ['admin_parts', queryParams],
        queryFn: () => adminPartApi.getAllParts(queryParams),
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000
    });

    const filtersQuery = useQuery({
        queryKey: ['admin_parts_filters'],
        queryFn: adminPartApi.getFiltersData,
        staleTime: Infinity
    });

    return {
        parts: partsQuery.data?.parts || [],
        pagination: partsQuery.data?.pagination || null,
        stats: partsQuery.data?.stats || null,
        isLoadingParts: partsQuery.isLoading,
        categories: filtersQuery.data?.categories || [],
        brands: filtersQuery.data?.brands || [],
        isLoadingFilters: filtersQuery.isLoading,
        refetchParts: partsQuery.refetch
    };
};

export const useAdminPartsMutations = (messageApi, t) => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: adminPartApi.deletePart,
        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: ['admin_parts'] });
            const previousParts = queryClient.getQueryData(['admin_parts']);

            queryClient.setQueryData(['admin_parts'], (old) => {
                if (!old || !old.parts) return old;
                return { ...old, parts: old.parts.filter(p => p.id !== deletedId) };
            });

            return { previousParts };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['admin_parts'], context.previousParts);
            messageApi.error(t('common:error', 'Có lỗi xảy ra, vui lòng thử lại!'));
        },
        onSuccess: () => {
            messageApi.success(t('common:deleteSuccess', 'Đã xóa thành công'));
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_parts'] });
        }
    });

    const bulkDeleteMutation = useMutation({
        mutationFn: adminPartApi.bulkDeleteParts,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['admin_parts'] });
        },
        onError: () => {
            messageApi.error(t('common:error', 'Có lỗi xảy ra, vui lòng thử lại!'));
        }
    });

    const toggleStatusMutation = useMutation({
        mutationFn: ({ id, status }) => adminPartApi.updatePartStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_parts'] });
        },
        onError: () => {
            messageApi.error(t('common:error', 'Cập nhật trạng thái thất bại!'));
        }
    });

    return {
        deletePart: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        bulkDeleteParts: bulkDeleteMutation.mutateAsync,
        isBulkDeleting: bulkDeleteMutation.isPending,
        toggleStatus: toggleStatusMutation.mutate,
        isTogglingStatus: toggleStatusMutation.isPending
    };
};


// ----------------------------------------
// HOOKS CHO FORM CHI TIẾT (PART FORM)
// ----------------------------------------

export const useAdminSinglePartData = (id, t) => {
    const isEditMode = Boolean(id);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { message } = App.useApp();

    const partQuery = useQuery({
        queryKey: ['admin_part', id],
        queryFn: () => adminPartApi.getPartById(id),
        enabled: isEditMode,
        staleTime: 0
    });

    const filtersQuery = useQuery({
        queryKey: ['admin_parts_filters'],
        queryFn: adminPartApi.getFiltersData,
        staleTime: Infinity
    });

    const saveMutation = useMutation({
        mutationFn: ({ payload, action }) => {
            if (action === 'duplicate') {
                const duplicatedPayload = {
                    ...payload,
                    name: `${payload.name} (Copy)`,
                    sku: `${payload.sku}-COPY`
                };
                return adminPartApi.createPart(duplicatedPayload);
            }

            return isEditMode
                ? adminPartApi.updatePart(id, payload)
                : adminPartApi.createPart(payload);
        },
        onSuccess: (data, variables) => {
            const { action } = variables;
            queryClient.invalidateQueries({ queryKey: ['admin_parts'] });

            if (action === 'draft') {
                message.success('Đã lưu bản nháp an toàn!');
                navigate('/admin/parts');
            } else if (action === 'duplicate') {
                message.success('Nhân bản thành công! Hãy tiếp tục chỉnh sửa bản sao.');
                navigate(`/admin/parts/edit/${data.id}`);
            } else {
                message.success(t('common:saveSuccess', 'Đã lưu thành công!'));
                navigate('/admin/parts');
            }
        },
        onError: (err) => {
            message.error(err?.response?.data?.message || t('common:error', 'Thao tác thất bại!'));
        }
    });

    const createBrandMutation = useMutation({
        mutationFn: adminPartApi.createPartBrand,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_parts_filters'] });
        }
    });

    return {
        partData: partQuery.data,
        isLoadingPart: partQuery.isLoading && isEditMode,
        categories: filtersQuery.data?.categories || [],
        brands: filtersQuery.data?.brands || [],
        savePart: saveMutation.mutate,
        isSaving: saveMutation.isPending,
        createBrandAsync: createBrandMutation.mutateAsync,
        isEditMode
    };
};
