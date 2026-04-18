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
        <div className="bg-white dark:bg-[#141416] rounded-[40px] p-8 lg:p-10 border border-slate-100 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-1.5 h-6 bg-yellow-500 rounded-full"></div>
                <h3 className="text-[13px] font-black uppercase tracking-[0.3em] text-slate-800 dark:text-slate-100">
                    {t('mediaVideosTitle', 'Thước Phim (Video Management)')}
                </h3>
            </div>

            <VideoInputForm />

            <div className="space-y-6">
                {videos && videos.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {videos.map((video, index) => (
                            <VideoGridItem 
                                key={`${video.url}-${index}`} 
                                video={video} 
                                index={index} 
                                onRemove={onRemoveVideo} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-16 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-white/[0.02] rounded-[32px] border-2 border-dashed border-slate-100 dark:border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            {t('noVideosFound', 'Chưa có video nào được lưu')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideosManagement;
