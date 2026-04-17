import React from 'react';
import { useTranslation } from 'react-i18next';
import { UploadCloud } from 'lucide-react';
import { Upload } from 'antd';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';

const GalleryDropzone = () => {
    const { t } = useTranslation('adminCarForm');
    const { handleAddPhotos } = useMediaLibrary();

    const uploadProps = {
        name: 'file',
        multiple: true,
        showUploadList: false,
        openFileDialogOnClick: true,
        customRequest: ({ file, onSuccess }) => {
            handleAddPhotos([file]);
            onSuccess("ok");
        }
    };

    return (
        <Upload {...uploadProps} className="w-full mb-8 block" style={{ width: '100%' }}>
            <div className="cursor-pointer bg-slate-50/50 dark:bg-[#1a1a1c]/50 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[24px] hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300 w-full">
                <div className="flex items-center justify-center py-6 px-4 gap-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <UploadCloud size={20} className="text-yellow-500" />
                    </div>
                    <p className="text-sm font-bold text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                        {t('mediaGalleryDropzone', 'Kéo thả hoặc click để tải lên nhiều ảnh cùng lúc')}
                    </p>
                </div>
            </div>
        </Upload>
    );
};

export default GalleryDropzone;
