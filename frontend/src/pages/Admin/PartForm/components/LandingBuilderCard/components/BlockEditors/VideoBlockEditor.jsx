import React from 'react';
import { useWatch } from 'react-hook-form';
import FormInput from '../../../ui/FormInput';
import { PlayCircle } from 'lucide-react';
import { Image } from 'antd';

const VideoBlockEditor = ({ control, index, t }) => {
    const blockData = useWatch({ control, name: `landing_blocks.${index}` }) || {};

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
            <div className="hidden xl:block absolute top-3 right-3 bg-indigo-500 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-md font-bold z-20 shadow-lg pointer-events-none">
                {t('adminPartForm:livePreview')}
            </div>

            {/* Left: Input Form */}
            <div className="col-span-1 xl:col-span-4 space-y-6">
                <FormInput name={`landing_blocks.${index}.title`} control={control} placeholder={t('adminPartForm:phH2Title')} />
                <FormInput name={`landing_blocks.${index}.video_url`} control={control} placeholder={t('adminPartForm:phVideoUrl')} />
                <FormInput name={`landing_blocks.${index}.cover_image`} control={control} placeholder={t('adminPartForm:phCoverImage')} />
            </div>

            {/* Right: Live Preview Panel */}
            <div className="col-span-1 xl:col-span-8 bg-slate-900 rounded-2xl overflow-hidden relative border-4 border-slate-800 shadow-2xl flex items-center justify-center min-h-[400px]">
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center items-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl">
                    {blockData.title && <h3 className="text-3xl font-black uppercase text-center mb-8">{blockData.title}</h3>}
                    <div className="w-full max-w-3xl aspect-video rounded-3xl overflow-hidden shadow-xl relative bg-black group flex items-center justify-center border-4 border-slate-100 dark:border-white/5">
                        {blockData.cover_image ? (
                            <div className="absolute inset-0 z-0">
                                <Image src={blockData.cover_image} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" preview={false} />
                            </div>
                        ) : null}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <PlayCircle size={64} className="text-white opacity-80" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoBlockEditor;
