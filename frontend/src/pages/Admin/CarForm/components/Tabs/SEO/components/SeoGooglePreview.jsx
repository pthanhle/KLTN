import React from 'react';
import { Eye, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSeoPreview } from '../hooks/useSeoPreview';
import { SEO_CONSTANTS } from '../constants/seo.constants';

const SeoGooglePreview = () => {
    const { t } = useTranslation('adminCarForm');
    const { slug, metaTitle, metaDescription } = useSeoPreview();

    return (
        <section className="lg:sticky lg:top-8 w-full h-fit pt-8 lg:pt-0">
            <div className="bg-slate-50 dark:bg-[#1a1a1c] border border-slate-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm">

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-widest translate-y-[1px]">
                            {t('seoPreviewHeading', 'Xem trước Google Search')}
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#222225] rounded-2xl p-6 md:px-9 md:py-6 shadow-sm border border-slate-200 dark:border-white/10 transition-all z-10 relative">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-[#1c1c1e] flex items-center justify-center overflow-hidden shrink-0">
                                <span className="text-[10px] font-black text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 rounded-full w-full h-full flex items-center justify-center">
                                    {SEO_CONSTANTS.SITE_FAVICON_TEXT}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] text-slate-800 dark:text-slate-300 font-medium">
                                    {SEO_CONSTANTS.SITE_NAME}
                                </span>
                                <p className="text-[12px] text-emerald-700 dark:text-emerald-400">
                                    {SEO_CONSTANTS.URL_PREFIX}{slug || ''}
                                </p>
                            </div>

                        </div>

                        <h3 className="text-[18px] md:text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] font-normal hover:underline cursor-pointer leading-tight truncate">
                            {metaTitle || SEO_CONSTANTS.FALLBACK_TITLE}
                        </h3>
                        <p className="text-[13px] md:text-[14px] text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed line-clamp-2 mt-1">
                            {metaDescription || SEO_CONSTANTS.FALLBACK_DESC}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SeoGooglePreview;
