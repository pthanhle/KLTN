import React from 'react';
import { useWatch, useFieldArray } from 'react-hook-form';
import FormInput from '../../../ui/FormInput';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Image } from 'antd';

const GalleryBlockEditor = ({ control, index, t }) => {
    const blockData = useWatch({ control, name: `landing_blocks.${index}` }) || {};
    const { fields, append, remove } = useFieldArray({ control, name: `landing_blocks.${index}.images` });

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
            <div className="hidden xl:block absolute top-3 right-3 bg-indigo-500 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-md font-bold z-20 shadow-lg pointer-events-none">
                {t('adminPartForm:livePreview')}
            </div>

            {/* Left: Input Form */}
            <div className="col-span-1 xl:col-span-4 space-y-6">
                <FormInput name={`landing_blocks.${index}.title`} control={control} placeholder={t('adminPartForm:phH2Title')} />
                
                <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('adminPartForm:lblImages')}</p>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                        {fields.map((field, fIndex) => (
                            <div key={field.id} className="relative flex items-center gap-3">
                                <FormInput name={`landing_blocks.${index}.images.${fIndex}.url`} control={control} placeholder={t('adminPartForm:phImgUrl') || "Image URL"} extraClassName="!mb-0 flex-1" />
                                <button type="button" onClick={() => remove(fIndex)} className="p-3 text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={() => append({ url: '' })} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 font-bold transition-all">
                        <Plus size={16} /> {t('adminPartForm:btnAddImage')}
                    </button>
                </div>
            </div>

            {/* Right: Live Preview Panel */}
            <div className="col-span-1 xl:col-span-8 bg-slate-900 rounded-2xl overflow-hidden relative border-4 border-slate-800 shadow-2xl flex items-center justify-center min-h-[400px]">
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl">
                    {blockData.title && <h3 className="text-3xl font-black uppercase text-center mb-8">{blockData.title}</h3>}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {(blockData.images || []).map((img, idx) => (
                            <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative shadow-sm border border-slate-200 dark:border-white/5">
                                {img.url ? <Image src={img.url} className="w-full h-full object-cover" alt="" preview={false} /> : <ImageIcon size={32} className="opacity-30" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryBlockEditor;
