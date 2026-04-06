import React from 'react';
import { PlayCircle } from 'lucide-react';
import { Image } from 'antd';
import { getEmbedUrl } from '../../utils/videoUtils';

const VideoBlock = ({ block, t }) => {
    const embedUrl = getEmbedUrl(block.video_url);

    return (
        <div className="w-full py-16 lg:py-24 rounded-[3rem] px-4 md:px-8 bg-transparent">
            <div className="max-w-5xl mx-auto space-y-12">
                {block.title && (
                    <div className="text-center">
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900 dark:text-white">{block.title}</h3>
                    </div>
                )}
                
                <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-black group border-4 border-white/10">
                    {embedUrl ? (
                         <iframe 
                            src={embedUrl.replace('autoplay=1', 'autoplay=0')} 
                            title={block.title || t('parts:videoTitle', 'Video')}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full border-0 absolute inset-0 z-10"
                        ></iframe>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white/50 space-y-4">
                            <PlayCircle size={64} strokeWidth={1} />
                            <p>{t('parts:videoNotProvided', 'Video chưa được cung cấp.')}</p>
                        </div>
                    )}
                    
                    {/* Cover image placeholder IF no video interaction yet (Optional) */}
                    {block.cover_image && !embedUrl && (
                        <div className="absolute inset-0 z-0 object-cover">
                            <Image src={block.cover_image} alt={t('parts:videoCover', 'Video Cover')} className="w-full h-full object-cover opacity-50" preview={false} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoBlock;
