import { useFieldArray, useFormContext } from 'react-hook-form';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';

export const useLandingBuilderLogic = (control) => {
    const { setValue } = useFormContext();
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'landing_blocks'
    });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const addBlock = (type) => {
        const id = `${type}-${Date.now()}`;
        if (type === 'hero') {
            append({ type: 'hero', theme: 'dark', title: '', subtitle: '', image_url: '', align: 'left', id });
        } else if (type === 'text') {
            append({ type: 'text', theme: 'light', title: '', content: '', id });
        } else if (type === 'feature_grid') {
            append({ type: 'feature_grid', theme: 'light', title: '', subtitle: '', features: [{ icon: '', title: '', description: '' }], id });
        } else if (type === 'gallery') {
            append({ type: 'gallery', theme: 'light', title: '', subtitle: '', images: [], id });
        } else if (type === 'video') {
            append({ type: 'video', theme: 'dark', title: '', video_url: '', cover_image: '', id });
        }
    };

    const handleImageUpload = (index, info) => {
        if (info.file.status === 'done') {
            const url = info.file.response;
            if (url && typeof url === 'string') {
                setValue(`landing_blocks.${index}.image_url`, url, { shouldValidate: true, shouldDirty: true });
            }
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex(item => item.id === active.id);
            const newIndex = fields.findIndex(item => item.id === over.id);
            move(oldIndex, newIndex);
        }
    };

    return {
        fields,
        addBlock,
        removeBlock: remove,
        moveBlock: move,
        handleImageUpload,
        sensors,
        handleDragEnd
    };
};
