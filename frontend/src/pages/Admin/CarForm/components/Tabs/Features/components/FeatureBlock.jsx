import React from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FeatureInputFields from './FeatureInputFields';
import FeatureCoverPreview from './FeatureCoverPreview';

const FeatureBlock = ({ name, restField, removeFeature }) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <section className="relative bg-white dark:bg-[#1a1a1c] rounded-3xl p-6 md:p-10 shadow-sm transition-all hover:shadow-yellow-500/5 group border border-slate-100 dark:border-white/5 w-full">
            <button
                type="button"
                onClick={() => removeFeature(name)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white transition-colors cursor-pointer border-none z-50"
                title={t('removeFeatureBlock', 'Xóa khối tính năng')}
            >
                <Trash2 size={18} />
            </button>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full xl:pr-10">
                <div className="flex flex-col gap-6">
                    <FeatureInputFields name={name} restField={restField} />
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{t('featurePreviewLabel', 'Xem trước hình ảnh')}</p>
                    <FeatureCoverPreview name={name} />
                </div>
            </div>
        </section>
    );
};

export default FeatureBlock;
