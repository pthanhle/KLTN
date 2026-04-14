import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';
import PhotoGridItem from './PhotoGridItem';
import GalleryDropzone from './GalleryDropzone';

const PhotosGallery = () => {
    const { t } = useTranslation('adminCarForm');
    const { photos, handleMakeHero, handleRemovePhoto } = useMediaLibrary();

    return (
        <div className="bg-white dark:bg-[#141416] rounded-[32px] p-8 border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-yellow-500 rounded-full"></span>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        {t('mediaGalleryTitle', 'Bộ Sưu Tập Chi Tiết')}
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-1.5 w-32 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-yellow-500 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min((photos.length / 20) * 100, 100)}%` }}
                        ></div>
                    </div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        {photos.length} / 20 {t('mediaImageCount', 'Ảnh')}
                    </span>
                </div>
            </div>

            <GalleryDropzone />

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <PhotoGridItem 
                        key={`${photo}-${index}`} 
                        photo={photo} 
                        index={index}
                        onMakeHero={handleMakeHero}
                        onRemove={handleRemovePhoto}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotosGallery;
