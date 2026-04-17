import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImagePlus } from 'lucide-react';
import { Upload } from 'antd';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';

const HeroImageDropzone = () => {
    const { t } = useTranslation('adminCarForm');
    const { handleSetHeroImage } = useMediaLibrary();

    const uploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        openFileDialogOnClick: true,
        customRequest: ({ file, onSuccess }) => {
            handleSetHeroImage(file);
            onSuccess("ok");
        }
    };

    return (
        <div className="mt-6">
            <Upload {...uploadProps} className="w-full block" style={{ width: '100%' }}>
                <div className="cursor-pointer bg-white/50 dark:bg-[#141416]/50 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300 w-full">
                    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:bg-yellow-500/20 transition-colors">
                            <ImagePlus size={28} className="text-slate-400 group-hover:text-yellow-500 transition-colors" />
                        </div>
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-1">
                            {t('mediaHeroUploadTitle', 'Tải ảnh đại diện mới')}
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
                            {t('mediaHeroUploadDesc', 'Định dạng JPG, PNG • Tối đa 5MB')}
                        </p>
                    </div>
                </div>
            </Upload>
        </div>
    );
};

export default HeroImageDropzone;
