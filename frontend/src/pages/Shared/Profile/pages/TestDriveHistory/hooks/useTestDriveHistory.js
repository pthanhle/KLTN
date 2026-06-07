import { useState, useMemo } from 'react';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useGetTestDriveList, useCancelTestDrive } from '../../../../../../services/queries/bookingQueries';
import { filterTestDrivesByStatus } from '../utils/historyUtils';

export const useTestDriveHistory = (t) => {
    const { message, modal } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [filterType, setFilterType] = useState('upcoming'); // 'upcoming' | 'history'

    const { data: rawDrives = [], isLoading, isError } = useGetTestDriveList();

    if (isError) {
        message.error(t('fetch_error', 'Lỗi tải dữ liệu.'));
    }

    const cancelMutation = useCancelTestDrive();

    const filteredDrives = useMemo(() => {
        return filterTestDrivesByStatus(rawDrives, filterType);
    }, [rawDrives, filterType]);

    const handleReschedule = (id) => {
        const drive = rawDrives.find(d => d._id === id);
        if (drive?.carId) {
            navigate(`/test-drive/${drive.carId}?reschedule_id=${id}`);
        } else {
            message.error(t('booking_notFound', 'Không tìm thấy lịch hẹn'));
        }
    };

    const handleCancel = (id) => {
        modal.confirm({
            title: t('cancel_confirm_title', 'Xác nhận hủy lịch'),
            content: t('cancel_confirm_content', 'Bạn có chắc muốn hủy lịch hẹn lái thử này không?'),
            okText: t('cancel_btn', 'Hủy Lịch'),
            cancelText: t('back_btn', 'Quay lại'),
            okButtonProps: { danger: true },
            onOk: () => {
                message.loading({ content: t('processing', 'Đang xử lý...'), key: 'cancel_drive' });
                cancelMutation.mutate(id, {
                    onSuccess: () => {
                        message.success({ content: t('cancel_success', 'Hủy lịch thành công.'), key: 'cancel_drive' });
                        queryClient.setQueryData(['testDriveList'], (old) =>
                            old?.map(d => d._id === id ? { ...d, status: 'Cancelled' } : d)
                        );
                    },
                    onError: () => {
                        message.error({ content: t('action_error', 'Lỗi hệ thống.'), key: 'cancel_drive' });
                    }
                });
            }
        });
    };

    return {
        drives: filteredDrives,
        isLoading,
        filterType,
        setFilterType,
        handleReschedule,
        handleCancel
    };
};
