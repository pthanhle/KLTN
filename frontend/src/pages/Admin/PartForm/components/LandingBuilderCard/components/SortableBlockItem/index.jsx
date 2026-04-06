import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import HeroBlockEditor from '../BlockEditors/HeroBlockEditor';
import TextBlockEditor from '../BlockEditors/TextBlockEditor';
import FeatureGridBlockEditor from '../BlockEditors/FeatureGridBlockEditor';
import GalleryBlockEditor from '../BlockEditors/GalleryBlockEditor';
import VideoBlockEditor from '../BlockEditors/VideoBlockEditor';

const SortableBlockItem = ({ id, field, index, control, removeBlock, handleImageUpload, t }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0.8 : 1,
        boxShadow: isDragging ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : undefined,
    };

    const blockTypeLabels = {
        hero: t('adminPartForm:blockHero'),
        text: t('adminPartForm:blockText'),
        feature_grid: t('adminPartForm:blockFeatureGrid', 'Lưới Tính Năng'),
        gallery: t('adminPartForm:blockGallery', 'Gallery'),
        video: t('adminPartForm:blockVideo', 'Video')
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            className={`relative bg-slate-50 dark:bg-[#151b2d] rounded-2xl border-2 ${isDragging ? 'border-indigo-500' : 'border-slate-200/50 dark:border-white/5'} overflow-hidden group transition-colors hover:border-indigo-500/30 touch-none`}
        >
            <div className={`flex items-center justify-between px-4 py-3 bg-white/50 dark:bg-white/5 border-b border-slate-200/50 dark:border-white/5 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} {...attributes} {...listeners}>
                <div className="flex items-center gap-2">
                    <GripVertical className="text-slate-400" size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded-md">
                        {blockTypeLabels[field.type] || field.type}
                    </span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onPointerDown={(e) => e.stopPropagation()} onClick={() => removeBlock(index)} className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
            </div>

            <div className="p-6 cursor-default" onPointerDown={(e) => e.stopPropagation()}>
                {field.type === 'hero' && <HeroBlockEditor control={control} index={index} handleImageUpload={handleImageUpload} t={t} />}
                {field.type === 'text' && <TextBlockEditor control={control} index={index} t={t} />}
                {field.type === 'feature_grid' && <FeatureGridBlockEditor control={control} index={index} t={t} />}
                {field.type === 'gallery' && <GalleryBlockEditor control={control} index={index} t={t} />}
                {field.type === 'video' && <VideoBlockEditor control={control} index={index} t={t} />}
            </div>
        </div>
    );
};

export default SortableBlockItem;
