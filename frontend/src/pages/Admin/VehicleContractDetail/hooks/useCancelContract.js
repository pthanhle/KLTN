import { useApproveContractMutation } from '../../../../services/queries/vehicleContract.queries';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { STATUS_ENUM, CANCEL_REASONS } from '../constants/contract.constants';

export const useCancelContract = (contractId, currentNote) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const updateMutation = useApproveContractMutation();

    const handleCancel = async (values, onSuccess) => {
        try {
            const reasonLabel = CANCEL_REASONS.find(r => r.value === values.cancel_reason)?.label || values.cancel_reason;

            const appendText = `[Hủy: ${reasonLabel}] ${values.cancel_note || ''}`.trim();
            const finalNote = currentNote ? `${currentNote}\n${appendText}` : appendText;

            await updateMutation.mutateAsync({
                id: contractId,
                statusData: {
                    status: STATUS_ENUM.CANCELLED,
                    reason: finalNote
                }
            });

            message.success(t('Đã hủy hợp đồng thành công. Xe đã được nhả về kho.'));
            if (onSuccess) onSuccess();

        } catch (error) {
            message.error(error?.response?.data?.message || t('Có lỗi xảy ra khi hủy hợp đồng'));
            throw error;
        }
    };

    return {
        handleCancel,
        isCancelling: updateMutation.isPending
    };
};
