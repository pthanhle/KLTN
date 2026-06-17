import { useVehicleContractDetailQuery, useApproveContractMutation } from '../../../../services/queries/vehicleContract.queries';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

export const useVehicleContractDetail = (id) => {
    const { t } = useTranslation('adminVehicleContractDetail');

    const { data: response, isLoading } = useVehicleContractDetailQuery(id);
    const approveMutation = useApproveContractMutation();

    const contract = response?.data || response;

    const handleApprove = () => {
        approveMutation.mutate({ id, statusData: { status: 'issued', approved_at: new Date() } }, {
            onSuccess: () => {
                message.success(t('Đã duyệt hợp đồng thành công!'));
            },
            onError: () => {
                message.error(t('Duyệt thất bại!'));
            }
        });
    };

    return {
        state: {
            contract,
            isLoading,
            isApproving: approveMutation.isPending || approveMutation.isLoading, // Compat for both React Query v4/v5
        },
        actions: {
            handleApprove,
        }
    };
};
