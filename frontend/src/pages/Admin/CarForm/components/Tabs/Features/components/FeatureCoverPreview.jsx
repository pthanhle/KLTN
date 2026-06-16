import React from 'react';
import { Form, Image } from 'antd';
import { Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeatureCoverPreview = ({ name }) => {
    const { t } = useTranslation('adminCarForm');
    const rawImage = Form.useWatch(['features', name, 'image']);
    
    const getPreviewUrl = (val) => {
        if (!val) return null;
        if (typeof val === 'string') return val;
        if (Array.isArray(val) && val.length > 0) {
            const file = val[0];
            if (file.url) return file.url;
            if (file.originFileObj) return URL.createObjectURL(file.originFileObj);
            if (file instanceof File) return URL.createObjectURL(file);
        }
        return null;
    };

    const imageUrl = getPreviewUrl(rawImage);

    return (
        <div className="w-full h-full min-h-[320px] rounded-3xl overflow-hidden bg-slate-50 dark:bg-black/40 border border-slate-100 dark:border-white/5 flex items-center justify-center relative group shadow-inner">
            {imageUrl ? (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <Image
                        preview={false}
                        src={imageUrl}
                        alt="Feature Preview"
                        rootClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 pointer-events-none">
                        <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">{t('featurePreviewDisplay', 'Xem trước hiển thị')}</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 text-slate-300 dark:text-slate-600 animate-pulse">
                    <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                        <ImageIcon size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest">{t('featurePreviewEmpty', 'Chưa có ảnh mô tả')}</p>
                </div>
            )}
        </div>
    );
};

export default FeatureCoverPreview;
