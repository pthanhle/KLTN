import { useController } from 'react-hook-form';
import { message } from 'antd';
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { uploadImages } from '../../../../../../services/api/upload.api';

export const useMediaGallery = (control, name, t) => {
    const { field } = useController({ control, name });
    const images = field.value || [];
    const [isUploading, setIsUploading] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleUpload = async (info) => {
        const { file } = info;
        if (file.status !== 'done' || !file.originFileObj) return;

        try {
            setIsUploading(true);
            const uploadedUrls = await uploadImages([file.originFileObj]);

            field.onChange([...images, ...uploadedUrls]);
            message.success(t('adminPartForm:uploadSuccess'));
        } catch (error) {
            console.error('Upload error:', error);
            message.error(error.message || t('adminPartForm:uploadError', 'Lỗi tải ảnh lên'));
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = (index) => {
        const newImgs = [...images];
        newImgs.splice(index, 1);
        field.onChange(newImgs);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = images.indexOf(active.id);
            const newIndex = images.indexOf(over.id);
            field.onChange(arrayMove(images, oldIndex, newIndex));
        }
    };

    return {
        images,
        sensors,
        handleUpload,
        handleRemove,
        handleDragEnd,
        isUploading
    };
};
