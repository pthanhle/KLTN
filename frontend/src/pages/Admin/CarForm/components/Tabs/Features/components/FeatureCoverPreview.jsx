import { Image, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon } from 'lucide-react';
import { useFeaturePreview } from '../hooks/useFeaturePreview';
import { FEATURE_CONSTANTS } from '../constants/feature.constants';

const FeatureCoverPreview = ({ name }) => {
    const { t } = useTranslation('adminCarForm');
    const { image } = useFeaturePreview(name);

    return (
        <div className="rounded-2xl overflow-hidden h-40 xl:h-full min-h-[160px] relative group-hover:scale-[1.01] transition-transform duration-500 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#222225] flex items-center justify-center mt-6 xl:mt-0">
            {image ? (
                <Image
                    src={image}
                    alt="Cover Preview"
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                    preview={true}
                    placeholder={<Skeleton.Image active className="w-full h-full flex items-center justify-center scale-150" />}
                    fallback={FEATURE_CONSTANTS.FALLBACK_IMAGE}
                />
            ) : (
                <div className="flex flex-col items-center opacity-30">
                    <ImageIcon size={32} className="text-slate-400 mb-2" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">
                        {t('noImageText', 'Chưa có ảnh')}
                    </span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default FeatureCoverPreview;
