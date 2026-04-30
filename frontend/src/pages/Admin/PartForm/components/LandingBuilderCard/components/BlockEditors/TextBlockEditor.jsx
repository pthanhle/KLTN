import React from 'react';
import { useWatch } from 'react-hook-form';
import FormInput from '../../../ui/FormInput';

const TextBlockEditor = ({ control, index, t }) => {
    const blockData = useWatch({ control, name: `landing_blocks.${index}` }) || {};

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            <div className="xl:col-span-7 space-y-4">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                        {t('adminPartForm:lblTitleOpt')}
                    </label>
                    <FormInput name={`landing_blocks.${index}.title`} control={control} placeholder={t('adminPartForm:phTitleOpt')} />
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                        {t('adminPartForm:lblContent')}
                    </label>
                    <FormInput name={`landing_blocks.${index}.content`} control={control} type="textarea" rows={6} placeholder={t('adminPartForm:phContent')} />
                </div>
            </div>

            {/* Live Visual Preview */}
            <div className="xl:col-span-5 relative w-full h-[220px] rounded-2xl bg-slate-50 dark:bg-[#1c1c1e] text-slate-900 border border-slate-200 dark:border-white/5 overflow-hidden p-8 shadow-sm flex items-center justify-center">
                <div className="h-full flex flex-col items-center justify-center text-center">
                    {blockData.title && (
                        <h4 className="text-xl font-bold mb-4 dark:text-white">
                            {blockData.title}
                        </h4>
                    )}
                    <p className="text-sm line-clamp-5 max-w-[80%] text-slate-600 dark:text-slate-300">
                        {blockData.content || t('adminPartForm:phContent')}
                    </p>
                </div>
                
                {/* Live Preview Badge */}
                <div className="absolute top-3 left-3 bg-indigo-500 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-md font-bold z-20 shadow-lg">
                    {t('adminPartForm:livePreview')}
                </div>
            </div>
        </div>
    );
};

export default TextBlockEditor;
