import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useApproveContractMutation } from '../../../../services/queries/vehicleContract.queries';
import { STATUS_ENUM } from '../constants/contract.constants';

export const useContractActions = (contractId) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const updateStatusMutation = useApproveContractMutation();

    const handleSign = async () => {
        try {
            await updateStatusMutation.mutateAsync({
                id: contractId,
                statusData: { status: STATUS_ENUM.SIGNED }
            });
            message.success(t('Đã xác nhận Khách Hàng ký hợp đồng.'));
        } catch (error) {
            message.error(t('Có lỗi xảy ra khi xác nhận ký.'));
        }
    };

    const handleDeliver = async () => {
        try {
            await updateStatusMutation.mutateAsync({
                id: contractId,
                statusData: { status: STATUS_ENUM.DELIVERED }
            });
            message.success(t('Bàn giao xe thành công!'));
        } catch (error) {
            message.error(error.response?.data?.message || t('Lỗi khi bàn giao xe.'));
        }
    };

    return {
        isUpdatingStatus: updateStatusMutation.isLoading,
        handleSign,
        handleDeliver
    };
};
