import { useMutation, useQueryClient } from '@tanstack/react-query';
import { partsApi } from '../data/partsMockApi';

export const usePartsMutations = (messageApi, t) => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id) => partsApi.deletePart(id),
        onMutate: async (deletedId) => {
            // Optimistic Update (Cập nhật giao diện lập tức trước khi API phản hồi)
            await queryClient.cancelQueries({ queryKey: ['admin_parts'] });
            const previousParts = queryClient.getQueryData(['admin_parts']);

            queryClient.setQueryData(['admin_parts'], (old) => {
                if (!old) return old;
                return old.filter(p => p.id !== deletedId);
            });

            return { previousParts };
        },
        onError: (err, newTodo, context) => {
            // Rollback nếu gọi API lỗi
            queryClient.setQueryData(['admin_parts'], context.previousParts);
            messageApi.error(t('common:error', 'Có lỗi xảy ra, vui lòng thử lại!'));
        },
        onSuccess: () => {
            messageApi.success(t('common:deleteSuccess', 'Đã xóa thành công'));
        },
        onSettled: () => {
            // Sync lại Cache dù lỗi hay thành công
            queryClient.invalidateQueries({ queryKey: ['admin_parts'] });
        }
    });

    return {
        deletePart: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending
    };
};
