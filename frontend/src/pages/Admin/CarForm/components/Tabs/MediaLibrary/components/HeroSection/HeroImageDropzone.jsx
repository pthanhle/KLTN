import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImagePlus } from 'lucide-react';
import { Upload } from 'antd';

const HeroImageDropzone = () => {
    const { t } = useTranslation('adminCarForm');
    const { Dragger } = Upload;

    const uploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        beforeUpload: () => false // return false to avoid auto action for now
    };

    return (
        <Dragger {...uploadProps} className="mt-6 block border-none !bg-transparent group relative h-48 w-full border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300 cursor-pointer overflow-hidden bg-white/50 dark:bg-[#141416]/50">
            <div className="flex flex-col items-center justify-center h-full">
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
        </Dragger>
    );
};

export default HeroImageDropzone;
