import { useState } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import axiosClient from '../../../../utils/axiosClient';
import { useUpdateVehicleContractMutation } from '../../../../services/queries/vehicleContract.queries';

export const useAttachments = (contractId, currentAttachments = []) => {
    const { t } = useTranslation('adminVehicleContractDetail');
    const [isUploading, setIsUploading] = useState(false);

    const updateMutation = useUpdateVehicleContractMutation();

    const customRequest = async ({ file, onSuccess, onError }) => {
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await axiosClient.post('/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res && res.url) {
                const newAttachments = [...currentAttachments, res.url];
                await updateMutation.mutateAsync({
                    id: contractId,
                    data: { attachments: newAttachments }
                });

                onSuccess(res.url, file);
                message.success(t('Upload file thành công!'));
            } else {
                throw new Error('Không nhận được URL file từ server');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            onError(error);
            message.error(t('Có lỗi xảy ra khi tải file lên'));
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = async (urlToRemove) => {
        try {
            const newAttachments = currentAttachments.filter(url => url !== urlToRemove);
            await updateMutation.mutateAsync({
                id: contractId,
                data: { attachments: newAttachments }
            });
            message.success(t('Đã xóa file đính kèm'));
        } catch (error) {
            message.error(t('Xóa file thất bại'));
        }
    };

    return {
        isUploading,
        isUpdating: updateMutation.isLoading,
        customRequest,
        handleRemove
    };
};
