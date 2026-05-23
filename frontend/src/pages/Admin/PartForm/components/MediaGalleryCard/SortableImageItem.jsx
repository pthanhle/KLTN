import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Image } from 'antd';
import { GripVertical, X } from 'lucide-react';

const SortableImageItem = ({ id, imgUrl, index, onRemove, t }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="aspect-square rounded-xl bg-slate-100 dark:bg-[#1c1c1e] overflow-hidden relative border border-slate-200 dark:border-white/20 group hover:shadow-lg transition-all"
        >
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 left-2 p-1.5 rounded-md bg-black/60 text-white cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-black/80"
            >
                <GripVertical size={14} />
            </div>

            <div className="w-full h-full [&_.ant-image]:w-full [&_.ant-image]:h-full flex items-center justify-center">
                <Image
                    src={imgUrl}
                    alt={`Part IMG ${index}`}
                    className="w-full h-full object-cover"
                    preview={true}
                />
            </div>

            <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg z-20"
            >
                <X size={14} strokeWidth={3} />
            </button>

            {index === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/90 text-[10px] uppercase font-bold text-center py-1 text-black z-10 pointer-events-none">
                    {t('adminPartForm:coverImage')}
                </div>
            )}
        </div>
    );
};

export default SortableImageItem;
