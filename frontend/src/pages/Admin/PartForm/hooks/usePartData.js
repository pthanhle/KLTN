import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partsApi } from '../../Parts/data/partsMockApi';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const usePartData = (id, t) => {
    const isEditMode = Boolean(id);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Lấy Data Linh Kiện (Chỉ Edit Mode)
    const partQuery = useQuery({
        queryKey: ['admin_part', id],
        queryFn: () => partsApi.getPartById(id),
        enabled: isEditMode, 
        staleTime: 0 
    });

    // Lấy Data Bộ lọc/Category
    const filtersQuery = useQuery({
        queryKey: ['admin_parts_filters'],
        queryFn: partsApi.getFiltersData,
        staleTime: Infinity 
    });

    // Handle Thêm / Sửa qua API
    const saveMutation = useMutation({
        mutationFn: ({ payload, action }) => {
            if (action === 'duplicate') {
                // If duplicating, overwrite the ID and update name to avoid conflict
                const duplicatedPayload = { 
                    ...payload, 
                    name: `${payload.name} (Copy)`,
                    sku: `${payload.sku}-COPY`
                };
                return partsApi.createPart(duplicatedPayload);
            }
            
            return isEditMode 
                ? partsApi.updatePart(id, payload)
                : partsApi.createPart(payload);
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
        onError: () => {
            message.error(t('common:error', 'Thao tác thất bại!'));
        }
    });

    return {
        partData: partQuery.data,
        isLoadingPart: partQuery.isLoading && isEditMode,
        categories: filtersQuery.data?.categories || [],
        brands: filtersQuery.data?.brands || [],
        savePart: saveMutation.mutate,
        isSaving: saveMutation.isPending,
        isEditMode
    };
};
