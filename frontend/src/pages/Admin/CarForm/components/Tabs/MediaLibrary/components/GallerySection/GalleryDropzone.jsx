import React from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud } from 'lucide-react';
import { Upload } from 'antd';

const GalleryDropzone = () => {
    const { t } = useTranslation('adminCarForm');
    const { Dragger } = Upload;

    // TODO: implement real upload to Cloudinary logic with onCustomRequest
    const uploadProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        beforeUpload: () => false // return false to avoid auto action for now
    };

    return (
        <Dragger {...uploadProps} className="mb-8 block border-none !bg-transparent group h-24 w-full border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[24px] hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300 cursor-pointer bg-slate-50/50 dark:bg-[#1a1a1c]/50 !p-0">
            <div className="flex items-center justify-center h-full gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <UploadCloud size={20} className="text-yellow-500" />
                </div>
                <p className="text-sm font-bold text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                    {t('mediaGalleryDropzone', 'Kéo thả hoặc click để tải lên nhiều ảnh cùng lúc')}
                </p>
            </div>
        </Dragger>
    );
};

export default GalleryDropzone;
