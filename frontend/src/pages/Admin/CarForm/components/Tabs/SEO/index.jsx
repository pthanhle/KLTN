import React from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import SeoFormDetails from './components/SeoFormDetails';
import SeoGooglePreview from './components/SeoGooglePreview';

const SEOTab = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="w-full">
            <div className="mb-8">
                <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">{t('tabSEO', 'Tối ưu SEO')}</p>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                    {t('seoFormTitle', 'Cấu hình Siêu dũ liệu')}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 max-w-2xl leading-relaxed">
                    {t('seoFormDesc', 'Thiết lập các thông số ngầm cho công cụ tìm kiếm và mạng xã hội. Dữ liệu này không hiển thị trực tiếp trên giao diện người dùng nhưng cực kỳ quan trọng cho Marketing.')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">
                <SeoFormDetails />
                <SeoGooglePreview />
            </div>
        </div>
    );
};

export default SEOTab;
