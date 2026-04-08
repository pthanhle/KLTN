import { useState } from 'react';
import { message } from 'antd';
import axiosClient from '../../../../../../utils/axiosClient';

export const useBrandLogoUpload = (onChange, t) => {
    const [isUploading, setIsUploading] = useState(false);

    const customRequest = async ({ file, onSuccess, onError }) => {
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await axiosClient.post('/upload/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res && res.url) {
                onChange(res.url);
                onSuccess(res.url, file);
                message.success(t('adminBrands:msgUploadSuccess', 'Tải ảnh thành công!'));
            } else {
                throw new Error('Không nhận được URL ảnh từ server');
            }
        } catch (error) {
            onError(error);
            message.error(t('adminBrands:msgUploadError', 'Có lỗi xảy ra khi tải ảnh'));
        } finally {
            setIsUploading(false);
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onChange('');
    };

    return {
        isUploading,
        customRequest,
        handleClear
    };
};
