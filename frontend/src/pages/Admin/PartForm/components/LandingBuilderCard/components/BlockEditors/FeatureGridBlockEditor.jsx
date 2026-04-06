import React from 'react';
import { useWatch, useFieldArray } from 'react-hook-form';
import FormInput from '../../../ui/FormInput';
import FormSelect from '../../../ui/FormSelect';
import { Plus, Trash2, LayoutGrid } from 'lucide-react';
import { Image } from 'antd';

const FeatureGridBlockEditor = ({ control, index, t }) => {
    const blockData = useWatch({ control, name: `landing_blocks.${index}` }) || {};
    const { fields, append, remove } = useFieldArray({ control, name: `landing_blocks.${index}.features` });

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
            {/* Live Preview Label */}
            <div className="hidden xl:block absolute top-3 right-3 bg-indigo-500 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-md font-bold z-20 shadow-lg pointer-events-none">
                {t('adminPartForm:livePreview')}
            </div>

            {/* Left: Input Form */}
            <div className="col-span-1 xl:col-span-5 space-y-6">
                <FormInput name={`landing_blocks.${index}.title`} control={control} placeholder={t('adminPartForm:phH2Title')} />
                <FormInput name={`landing_blocks.${index}.subtitle`} control={control} type="textarea" rows={3} placeholder={t('adminPartForm:phSubtitle')} />
                
                <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t('adminPartForm:lblFeatures')}</p>
                    {fields.map((field, fIndex) => (
                        <div key={field.id} className="relative p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 space-y-3 group">
                            <button type="button" onClick={() => remove(fIndex)} className="absolute -top-2 -right-2 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all z-10"><Trash2 size={12} /></button>
                            <FormInput name={`landing_blocks.${index}.features.${fIndex}.title`} control={control} placeholder={t('adminPartForm:phFeatureTitle')} extraClassName="!mb-0" />
                            <FormInput name={`landing_blocks.${index}.features.${fIndex}.description`} control={control} type="textarea" rows={2} placeholder={t('adminPartForm:phFeatureDesc')} extraClassName="!mb-0" />
                            <FormInput name={`landing_blocks.${index}.features.${fIndex}.icon`} control={control} placeholder={t('adminPartForm:btnUploadIcon') + " (URL)"} extraClassName="!mb-0" />
                        </div>
                    ))}
                    <button type="button" onClick={() => append({ title: '', description: '', icon: '' })} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 hover:text-indigo-500 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 font-bold transition-all">
                        <Plus size={16} /> {t('adminPartForm:btnAddFeature')}
                    </button>
                </div>
            </div>

            {/* Right: Live Preview Panel */}
            <div className="col-span-1 xl:col-span-7 bg-slate-900 rounded-2xl overflow-hidden relative border-4 border-slate-800 shadow-2xl flex items-center justify-center min-h-[400px]">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className="relative z-10 w-full h-full p-8 flex items-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl">
                    <div className="w-full max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{blockData.title || t('adminPartForm:blockFeatureGrid')}</h3>
                            {blockData.subtitle && <p className="text-lg max-w-2xl mx-auto text-slate-600 dark:text-slate-400">{blockData.subtitle}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(blockData.features || []).map((feat, idx) => (
                                <div key={idx} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 text-center space-y-4">
                                    <div className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center bg-slate-200 dark:bg-slate-700">
                                        {feat.icon ? <Image src={feat.icon} alt="" className="w-8 h-8 object-contain" preview={false} /> : <LayoutGrid size={24} className="opacity-50" />}
                                    </div>
                                    <h4 className="font-bold text-lg">{feat.title || t('adminPartForm:defFeatureTitle')}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{feat.description || t('adminPartForm:defFeatureDesc')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureGridBlockEditor;
