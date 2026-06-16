import { useEffect } from 'react';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '../services/socket';
import { vehicleContractKeys } from '../services/queries/vehicleContract.queries';

export const useSocketContractNotifications = () => {
    const queryClient = useQueryClient();
    const { t } = useTranslation('adminVehicleContracts');

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        const handleNewContract = (data) => {
            notification.info({
                message: t('Hợp đồng mới chờ duyệt'),
                description: `${t('Sales đã gửi hợp đồng cho số VIN')}: ${data?.vin || 'N/A'}`,
                placement: 'topRight',
            });
            queryClient.invalidateQueries({ queryKey: vehicleContractKeys.lists() });
        };

        const handleContractApproved = (data) => {
            notification.success({
                message: t('Đã duyệt'),
                description: `${t('Hợp đồng cho số VIN')}: ${data?.vin || 'N/A'} ${t('đã được duyệt.')}`,
                placement: 'topRight',
            });
            queryClient.invalidateQueries({ queryKey: vehicleContractKeys.lists() });
            if (data?.id) {
                queryClient.invalidateQueries({ queryKey: vehicleContractKeys.detail(data.id) });
            }
        };

        socket.on('new_contract_pending', handleNewContract);
        socket.on('contract_approved', handleContractApproved);

        return () => {
            socket.off('new_contract_pending', handleNewContract);
            socket.off('contract_approved', handleContractApproved);
        };
    }, [queryClient, t]);
};
