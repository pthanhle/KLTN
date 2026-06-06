import { useState } from 'react';
import { Upload, Spin, Image } from 'antd';
import { CloudUpload, X } from 'lucide-react';
import { useController } from 'react-hook-form';
import { uploadSingleImage } from '@/services/api/upload.api';

const { Dragger } = Upload;

const ImageUploadField = ({ name, control, label, compact = false }) => {
    const [uploading, setUploading] = useState(false);
    const { field } = useController({ name, control });

    const handleChange = async (info) => {
        const { file } = info;
        if (file.status !== 'done' || !file.originFileObj) return;
        try {
            setUploading(true);
            const url = await uploadSingleImage(file.originFileObj);
            field.onChange(url);
        } catch {
            // allow manual URL paste as fallback
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold select-none">
                    {label}
                </label>
            )}
            <Spin spinning={uploading}>
                <Dragger
                    multiple={false}
                    showUploadList={false}
                    accept="image/*"
                    customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0)}
                    onChange={handleChange}
                    className="[&_.ant-upload-drag]:!rounded-xl [&_.ant-upload-drag]:!border [&_.ant-upload-drag]:!border-dashed [&_.ant-upload-drag]:!border-slate-300 dark:[&_.ant-upload-drag]:!border-white/20 [&_.ant-upload-drag]:hover:!border-indigo-500 [&_.ant-upload-drag]:!bg-slate-50 dark:[&_.ant-upload-drag]:!bg-[#1c1c1e] [&_.ant-upload-drag]:!transition-colors"
                >
                    {field.value ? (
                        <div className={`relative overflow-hidden rounded-xl flex items-center justify-center bg-slate-100 dark:bg-[#0a0a0b] ${compact ? 'h-24' : 'aspect-video'}`}>
                            <Image
                                src={field.value}
                                preview={false}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                <CloudUpload size={14} className="text-white" />
                                <span className="text-white text-xs font-bold">Đổi ảnh</span>
                            </div>
                        </div>
                    ) : (
                        <div className={`flex flex-col items-center justify-center gap-2 text-slate-500 ${compact ? 'py-3' : 'py-6'}`}>
                            <CloudUpload size={compact ? 18 : 24} className="text-indigo-400" />
                            <p className={`font-bold ${compact ? 'text-[11px]' : 'text-xs'}`}>Kéo ảnh hoặc click để tải lên</p>
                        </div>
                    )}
                </Dragger>
            </Spin>
            <div className="flex items-center gap-1">
                <input
                    type="text"
                    value={field.value || ''}
                    onChange={e => field.onChange(e.target.value)}
                    placeholder="Hoặc dán URL ảnh..."
                    className="flex-1 text-[11px] px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 placeholder-slate-400 outline-none focus:border-indigo-400 transition-colors"
                />
                {field.value && (
                    <button
                        type="button"
                        onClick={() => field.onChange('')}
                        className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ImageUploadField;
