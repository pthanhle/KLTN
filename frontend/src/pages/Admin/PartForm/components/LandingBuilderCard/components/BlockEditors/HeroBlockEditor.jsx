import React from 'react';
import { Upload } from 'antd';
import { CloudUpload } from 'lucide-react';
import { useWatch } from 'react-hook-form';
import FormInput from '../../../ui/FormInput';
import FormSelect from '../../../ui/FormSelect';
import { getAlignOptions } from '../../constants/index.jsx';
import axiosClient from '../../../../../../utils/axiosClient';

const HeroBlockEditor = ({ control, index, handleImageUpload, t }) => {
    const blockData = useWatch({ control, name: `landing_blocks.${index}` }) || {};

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Editor Forms */}
            <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                            {t('adminPartForm:lblH2Title')}
                        </label>
                        <FormInput name={`landing_blocks.${index}.title`} control={control} placeholder={t('adminPartForm:phH2Title')} />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                            {t('adminPartForm:lblSubtitle')}
                        </label>
                        <FormInput name={`landing_blocks.${index}.subtitle`} control={control} type="textarea" rows={4} placeholder={t('adminPartForm:phSubtitle')} />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-[10px] uppercase tracking-widest text-slate-500 font-bold select-none">
                                {t('adminPartForm:lblImgUrl')}
                            </label>
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                customRequest={async ({ file, onSuccess, onError }) => {
                                    try {
                                        const formData = new FormData();
                                        formData.append('image', file);
                                        const res = await axiosClient.post('/upload/image', formData, {
                                            headers: { 'Content-Type': 'multipart/form-data' }
                                        });
                                        const url = res?.url || res?.data?.url || res;
                                        onSuccess(url);
                                    } catch (err) {
                                        onError(err);
                                    }
                                }}
                                onChange={(info) => handleImageUpload(index, info)}
                            >
                                <button type="button" className="text-[10px] flex items-center gap-1 font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors">
                                    <CloudUpload size={12} /> {t('adminPartForm:btnUploadImg')}
                                </button>
                            </Upload>
                        </div>
                        <FormInput name={`landing_blocks.${index}.image_url`} control={control} placeholder={t('adminPartForm:phImgUrl')} />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                            {t('adminPartForm:lblAlign')}
                        </label>
                        <FormSelect 
                            name={`landing_blocks.${index}.align`} 
                            control={control}
                            options={getAlignOptions(t)}
                        />
                    </div>
                </div>
            </div>

            {/* Live Visual Preview */}
            <div className="xl:col-span-5 relative w-full h-[220px] rounded-2xl bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 overflow-hidden group shadow-sm flex">
                <div className={`w-full h-full flex flex-col justify-center px-8 relative z-10 text-slate-900 dark:text-white ${blockData.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                    <h4 className="font-bold text-xl leading-tight mb-2">
                        {blockData.title || t('adminPartForm:phH2Title')}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                        {blockData.subtitle || t('adminPartForm:phSubtitle')}
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

export default HeroBlockEditor;
