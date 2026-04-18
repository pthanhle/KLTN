import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Trash2, Youtube, ExternalLink } from 'lucide-react';
import { Image, Skeleton, Tooltip } from 'antd';

const VideoGridItem = ({ video, index, onRemove }) => {
    const { t } = useTranslation('adminCarForm');

    const handleOpenVideo = () => {
        if (video.url) {
            window.open(video.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div className="group relative flex items-center gap-6 p-5 bg-white dark:bg-[#1a1a1c]/40 border border-slate-100 dark:border-white/5 rounded-[32px] hover:border-yellow-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500">
            <div 
                onClick={handleOpenVideo}
                className="relative w-48 aspect-video rounded-2xl overflow-hidden shadow-lg flex-shrink-0 bg-slate-200 dark:bg-slate-800 cursor-pointer group/thumb"
            >
                {video.thumbnail ? (
                    <Image 
                        wrapperClassName="w-full h-full block"
                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-700" 
                        src={video.thumbnail} 
                        alt={`Video thumbnail ${index}`} 
                        preview={false}
                        placeholder={<Skeleton.Image active className="w-full h-full" />}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                        <Youtube size={40} className="text-slate-700" />
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/thumb:bg-black/20 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/90 flex items-center justify-center shadow-xl backdrop-blur-sm group-hover/thumb:scale-110 transition-transform duration-500">
                        <Play size={24} className="text-slate-900 ml-1 fill-current" />
                    </div>
                </div>
                <div className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-lg opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                    <ExternalLink size={14} className="text-white" />
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-2">
                    <h4 
                        onClick={handleOpenVideo}
                        className="text-[15px] font-black text-slate-800 dark:text-slate-100 truncate cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors"
                    >
                        {video.title}
                    </h4>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-500/10 rounded-lg">
                            <Youtube size={14} className="text-red-600 dark:text-red-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-red-600 dark:text-red-500">
                                {t('mediaYoutubeLabel', 'YouTube')}
                            </span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            {video.duration}
                        </span>
                    </div>
                    <button
                        onClick={handleOpenVideo}
                        className="flex items-center gap-2 mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600 dark:text-yellow-500 hover:opacity-70 transition-all w-fit"
                    >
                        <span>{t('mediaViewLink', 'Xem trên trang gốc')}</span>
                        <ExternalLink size={12} />
                    </button>
                </div>
            </div>

            <Tooltip title={t('mediaActionDelete', 'Xóa video')}>
                <button 
                    type="button"
                    onClick={() => onRemove(index)}
                    className="absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-white dark:bg-[#222225] border border-slate-100 dark:border-white/10 text-slate-400 hover:text-red-500 hover:border-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 group-hover:translate-y-0"
                >
                    <Trash2 size={18} />
                </button>
            </Tooltip>
        </div>
    );
};

export default VideoGridItem;
