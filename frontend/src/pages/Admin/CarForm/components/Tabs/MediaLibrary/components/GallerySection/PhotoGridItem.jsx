import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Star, Trash2 } from 'lucide-react';
import { Image, Skeleton } from 'antd';

const PhotoGridItem = ({ photo, index, onMakeHero, onRemove }) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="relative group aspect-[3/2] rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-md">
            <Image 
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover" 
                src={photo.url} 
                alt={`Gallery ${index}`} 
                preview={{
                    maskClassName: 'hidden' // Hide default antd hover mask
                }}
                placeholder={<Skeleton.Image active className="w-full h-full flex items-center justify-center scale-150" />}
            />
            
            {/* Glassmorphism Action Bar */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none">
                <button 
                    type="button"
                    className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all pointer-events-auto" 
                    title={t('mediaActionView', 'Xem chi tiết')}
                >
                    <Eye size={18} />
                </button>
                <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onMakeHero(photo.raw); }}
                    className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all pointer-events-auto" 
                    title={t('mediaActionSetHero', 'Đặt làm Hero')}
                >
                    <Star size={18} />
                </button>
                <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onRemove(photo.raw); }}
                    className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all pointer-events-auto" 
                    title={t('mediaActionDelete', 'Xóa')}
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default PhotoGridItem;
