import React from 'react';
import { useTranslation } from 'react-i18next';
import { useVideoManager } from '../../hooks/useVideoManager';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';
import VideoGridItem from './VideoGridItem';
import VideoInputForm from './VideoInputForm';

const VideosManagement = () => {
    const { t } = useTranslation('adminCarForm');
    const { videos } = useMediaLibrary();
    const { onRemoveVideo } = useVideoManager();

    return (
        <div className="bg-white dark:bg-[#141416] rounded-[32px] p-8 border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-2 mb-8 px-1">
                <span className="w-1.5 h-4 bg-yellow-500 rounded-full"></span>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {t('mediaVideosTitle', 'Thước Phim (Video Management)')}
                </h3>
            </div>

            <VideoInputForm />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {videos.map((video, index) => (
                    <VideoGridItem 
                        key={`${video.url}-${index}`} 
                        video={video} 
                        index={index} 
                        onRemove={onRemoveVideo} 
                    />
                ))}
            </div>
        </div>
    );
};

export default VideosManagement;
