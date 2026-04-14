import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Trash2, Youtube } from 'lucide-react';
import { Image, Skeleton } from 'antd';

const VideoGridItem = ({ video, index, onRemove }) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="group flex items-center gap-5 p-4 bg-slate-50/30 dark:bg-[#1a1a1c]/30 border border-slate-100 dark:border-white/5 rounded-[28px] hover:bg-white dark:hover:bg-[#1f1f22] hover:border-yellow-500/40 hover:shadow-2xl transition-all duration-500">
            <div className="relative w-40 aspect-video rounded-2xl overflow-hidden shadow-lg flex-shrink-0 bg-slate-200 dark:bg-slate-800">
                {video.thumbnail && (
                    <Image 
                        wrapperClassName="w-full h-full block"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        src={video.thumbnail} 
                        alt={`Video thumbnail ${index}`} 
                        preview={false}
                        placeholder={<Skeleton.Image active className="w-full h-full flex items-center justify-center scale-[2.0]" />}
                    />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={20} className="text-slate-900 ml-1 fill-current" />
                    </div>
                </div>
            </div>
            <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 truncate mb-1 group-hover:text-yellow-500 transition-colors">
                    {video.title}
                </h4>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Youtube size={14} />
                        {t('mediaYoutubeLabel', 'YouTube')}
                    </span>
                    <span className="w-1 h-1 bg-slate-300 dark:bg-white/10 rounded-full"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {video.duration}
                    </span>
                </div>
            </div>
            <button 
                type="button"
                onClick={() => onRemove(index)}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                title={t('mediaActionDelete', 'Xóa')}
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};

export default VideoGridItem;
