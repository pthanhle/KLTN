import React, { useState } from 'react';
import { useWatch, useFieldArray } from 'react-hook-form';
import { Upload, Spin, Image } from 'antd';
import { CloudUpload, Trash2, Image as ImageIcon } from 'lucide-react';
import FormInput from '../../../ui/FormInput';
import { uploadImages } from '@/services/api/upload.api';

const { Dragger } = Upload;

const GalleryBlockEditor = ({ control, index, t }) => {
    const blockData = useWatch({ control, name: `landing_blocks.${index}` }) || {};
    const { fields, append, remove } = useFieldArray({ control, name: `landing_blocks.${index}.images` });
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (info) => {
        const { file } = info;
        if (file.status !== 'done' || !file.originFileObj) return;
        try {
            setUploading(true);
            const urls = await uploadImages([file.originFileObj]);
            urls.forEach(url => append({ url }));
        } catch {
            // silent fail
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
            <div className="hidden xl:block absolute top-3 right-3 bg-indigo-500 text-white text-[9px] uppercase tracking-widest px-2 py-1 rounded-md font-bold z-20 shadow-lg pointer-events-none">
                {t('adminPartForm:livePreview')}
            </div>

            {/* Left: Input Form */}
            <div className="col-span-1 xl:col-span-4 space-y-5">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-bold select-none">
                        {t('adminPartForm:lblH2Title')}
                    </label>
                    <FormInput name={`landing_blocks.${index}.title`} control={control} placeholder={t('adminPartForm:phH2Title')} />
                </div>

                <div className="space-y-3">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{t('adminPartForm:lblImages')}</p>

                    <Spin spinning={uploading} tip="Đang tải...">
                        <Dragger
                            multiple={true}
                            showUploadList={false}
                            accept="image/*"
                            customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0)}
                            onChange={handleUpload}
                            disabled={uploading}
                            className="[&_.ant-upload-drag]:!rounded-xl [&_.ant-upload-drag]:!border [&_.ant-upload-drag]:!border-dashed [&_.ant-upload-drag]:!border-slate-300 dark:[&_.ant-upload-drag]:!border-white/20 [&_.ant-upload-drag]:hover:!border-indigo-500 [&_.ant-upload-drag]:!bg-slate-50 dark:[&_.ant-upload-drag]:!bg-[#1c1c1e]"
                        >
                            <div className="py-5 flex flex-col items-center gap-2 text-slate-500">
                                <CloudUpload size={22} className="text-indigo-400" />
                                <p className="text-xs font-bold">Kéo nhiều ảnh hoặc click</p>
                                <p className="text-[10px] text-slate-400">PNG, JPG, WEBP</p>
                            </div>
                        </Dragger>
                    </Spin>

                    {fields.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                            {fields.map((field, fIndex) => {
                                const imgVal = blockData.images?.[fIndex]?.url;
                                return (
                                    <div key={field.id} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 group">
                                        {imgVal
                                            ? <Image src={imgVal} preview={false} className="w-full h-full object-cover" />
                                            : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={18} className="opacity-30" /></div>
                                        }
                                        <button
                                            type="button"
                                            onClick={() => remove(fIndex)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                        >
                                            <Trash2 size={10} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Live Preview Panel */}
            <div className="col-span-1 xl:col-span-8 bg-slate-900 rounded-2xl overflow-hidden relative border-4 dark:border-white/10 shadow-2xl flex items-center justify-center min-h-[400px]">
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-center bg-white dark:bg-[#141416] text-slate-900 dark:text-white rounded-2xl">
                    {blockData.title && <h3 className="text-3xl font-black uppercase text-center mb-8">{blockData.title}</h3>}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {(blockData.images || []).map((img, idx) => (
                            <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#1c1c1e] flex items-center justify-center relative shadow-sm border border-slate-200 dark:border-white/5">
                                {img.url ? <Image src={img.url} className="w-full h-full object-cover" alt="" preview={false} /> : <ImageIcon size={32} className="opacity-30" />}
                            </div>
                        ))}
                        {(!blockData.images || blockData.images.length === 0) && (
                            <div className="col-span-3 flex items-center justify-center h-32 text-slate-400 text-sm font-bold">
                                {t('adminPartForm:lblImages')} ...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryBlockEditor;
