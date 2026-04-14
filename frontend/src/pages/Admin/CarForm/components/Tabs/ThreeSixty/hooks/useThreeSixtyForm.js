import { useCallback } from 'react';
import { Form, message } from 'antd';
import { apiMockUploadThreeSixtyBatch } from '../data/threeSixty.data';

export const useThreeSixtyForm = (form) => {
    // Form access
    const threeSixtyData = Form.useWatch('threeSixty', form) || { images: [], lighting: 'HDR Studio Bright', environment: 'Minimalist Concrete' };
    const sequenceItems = threeSixtyData.images || [];
    const sequenceCount = sequenceItems.length;
    const lighting = threeSixtyData.lighting || 'HDR Studio Bright';
    const environment = threeSixtyData.environment || 'Minimalist Concrete';
    
    // Handlers
    const handleClearSequence = useCallback(() => {
        form.setFieldValue(['threeSixty', 'images'], []);
        message.success('Đã xóa toàn bộ chuỗi khung hình.');
    }, [form]);

    const handleUploadBatch = useCallback(async () => {
        try {
            message.loading('Đang khởi tạo máy chủ tải ảnh tĩnh...', 1);
            const urls = await apiMockUploadThreeSixtyBatch();
            form.setFieldValue(['threeSixty', 'images'], urls);
            message.success('Trích xuất 36 frame ảo thành công!');
        } catch (error) {
            message.error('Lỗi khi tải ảnh.');
        }
    }, [form]);

    const handleProcessAI = useCallback(() => {
        message.info('Tính năng Xử lý Khung hình bằng AI đang được phát triển.');
    }, []);

    const handleAdvancedConfig = useCallback(() => {
        message.info('Cấu hình nâng cao chưa khả dụng cho phiên bản rút gọn.');
    }, []);

    return {
        sequenceItems,
        sequenceCount,
        lighting,
        environment,
        handleClearSequence,
        handleUploadBatch,
        handleProcessAI,
        handleAdvancedConfig
    };
};
