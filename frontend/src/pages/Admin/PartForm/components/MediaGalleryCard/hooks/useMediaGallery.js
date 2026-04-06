import { useController } from 'react-hook-form';
import { message } from 'antd';
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export const useMediaGallery = (control, name, t) => {
    const { field } = useController({ control, name });
    const images = field.value || [];

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleUpload = (info) => {
        // Tạm thời mock logic lấy file blob để preview
        // Khi ghép API thực tế, logic call api upload sẽ gọi ở đây (phân tách Backend Request)
        if (info.file.status === 'done' || info.file.status === 'error' || !info.file.status) {
            const fakeUrl = URL.createObjectURL(info.file.originFileObj || info.file);
            field.onChange([...images, fakeUrl]);
            message.success(t('adminPartForm:uploadSuccess'));
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
        handleDragEnd
    };
};
